from django.contrib import admin
from .models import Category, Note

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'color', 'order']
    ordering = ['order', 'name']

@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'category', 'updated_at']
    list_filter = ['category', 'updated_at']
    search_fields = ['title', 'content']
