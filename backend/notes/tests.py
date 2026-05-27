import pytest
from django.contrib.auth.models import User
from notes.models import Category, Note


@pytest.fixture
def user():
    return User.objects.create_user(username="test@example.com", email="test@example.com", password="testpass123")


@pytest.fixture
def category():
    return Category.objects.create(name="Test Category", color="#FFFFFF", border_color="#000000", dot_color="#000000")


@pytest.mark.django_db
def test_category_creation(category):
    assert category.name == "Test Category"
    assert category.color == "#FFFFFF"


@pytest.mark.django_db
def test_note_creation(user, category):
    note = Note.objects.create(user=user, category=category, title="Test Note", content="Test content")
    assert note.title == "Test Note"
    assert note.user == user
    assert note.category == category
    assert str(note) == "Test Note"


@pytest.mark.django_db
def test_note_ordering(user, category):
    note1 = Note.objects.create(user=user, category=category, title="First")
    note2 = Note.objects.create(user=user, category=category, title="Second")
    notes = Note.objects.all()
    assert notes.first() == note2  # Most recent first


@pytest.mark.django_db
def test_category_note_count(user, category):
    Note.objects.create(user=user, category=category, title="Note 1")
    Note.objects.create(user=user, category=category, title="Note 2")
    assert category.notes.count() == 2
