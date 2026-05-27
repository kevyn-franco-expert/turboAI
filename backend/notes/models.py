from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    name: str = models.CharField(max_length=100, unique=True)
    color: str = models.CharField(max_length=7, default="#F4C2A1")
    border_color: str = models.CharField(max_length=7, default="#E8A87C")
    dot_color: str = models.CharField(max_length=7, default="#E07A5F")
    order: int = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]
        verbose_name_plural = "Categories"

    def __str__(self) -> str:
        return self.name


class Note(models.Model):
    user: User = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    category: Category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="notes")
    title: str = models.CharField(max_length=255, blank=True)
    content: str = models.TextField(blank=True)
    created_at: "datetime" = models.DateTimeField(auto_now_add=True)
    updated_at: "datetime" = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated_at"]

    def __str__(self) -> str:
        return self.title or "Untitled Note"
