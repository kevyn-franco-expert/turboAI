from typing import Any
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator
from .models import Category, Note
from .serializers import CategorySerializer, NoteSerializer


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all().order_by("order", "name")
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def get_serializer_context(self) -> dict[str, Any]:
        context = super().get_serializer_context()
        context["request"] = self.request
        return context


class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Note.objects.filter(user=self.request.user).select_related("category")
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category__name=category)
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_at=timezone.now())

    @method_decorator(ratelimit(key="user", rate="10/m", method="POST"))
    @method_decorator(ratelimit(key="user", rate="10/m", method="PUT"))
    @method_decorator(ratelimit(key="user", rate="10/m", method="PATCH"))
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @method_decorator(ratelimit(key="user", rate="10/m", method="PUT"))
    @method_decorator(ratelimit(key="user", rate="10/m", method="PATCH"))
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)
