import logging
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator

logger = logging.getLogger(__name__)


def ratelimit_exceeded(request, exception):
    logger.warning(f"Rate limit exceeded for IP: {request.META.get('REMOTE_ADDR')}")
    return Response(
        {"error": "Too many requests. Please try again later."},
        status=status.HTTP_429_TOO_MANY_REQUESTS,
    )


class SignUpView(generics.CreateAPIView):
    permission_classes = [AllowAny]

    @method_decorator(ratelimit(key="ip", rate="5/m", method="POST"))
    def post(self, request, *args, **kwargs):
        email: str = request.data.get("email", "").strip().lower()
        password: str = request.data.get("password", "")

        if not email or not password:
            logger.info("Signup attempt with missing email or password")
            return Response(
                {"error": "Email and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(username=email).exists():
            logger.info(f"Signup attempt with duplicate email: {email}")
            return Response(
                {"error": "User with this email already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            validate_password(password)
        except ValidationError as e:
            logger.info(f"Signup attempt with weak password for email: {email}")
            return Response(
                {"error": " ".join(e.messages)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User.objects.create_user(username=email, email=email, password=password)
        logger.info(f"New user created: {email}")
        return Response({"id": user.id, "email": user.email}, status=status.HTTP_201_CREATED)
