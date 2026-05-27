from typing import Any
from rest_framework import serializers
from .models import Category, Note


class CategorySerializer(serializers.ModelSerializer):
    note_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ["id", "name", "color", "border_color", "dot_color", "order", "note_count"]

    def get_note_count(self, obj: Category) -> int:
        request: Any = self.context.get("request")
        if request and request.user.is_authenticated:
            return obj.notes.filter(user=request.user).count()
        return 0


class NoteSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source="category", write_only=True
    )

    class Meta:
        model = Note
        fields = ["id", "title", "content", "category", "category_id", "created_at", "updated_at"]
        read_only_fields = ["created_at", "updated_at"]
