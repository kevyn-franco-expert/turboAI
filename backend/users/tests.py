import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient


@pytest.fixture
def api_client():
    return APIClient()


@pytest.mark.django_db
def test_signup(api_client):
    response = api_client.post("/api/auth/signup/", {"email": "new@example.com", "password": "newpass123"})
    assert response.status_code == 201
    assert User.objects.filter(username="new@example.com").exists()


@pytest.mark.django_db
def test_signup_duplicate_email(api_client):
    User.objects.create_user(username="dup@example.com", email="dup@example.com", password="pass")
    response = api_client.post("/api/auth/signup/", {"email": "dup@example.com", "password": "pass"})
    assert response.status_code == 400


@pytest.mark.django_db
def test_login(api_client):
    User.objects.create_user(username="login@example.com", email="login@example.com", password="loginpass")
    response = api_client.post("/api/auth/login/", {"username": "login@example.com", "password": "loginpass"})
    assert response.status_code == 200
    assert "access" in response.data
    assert "refresh" in response.data
