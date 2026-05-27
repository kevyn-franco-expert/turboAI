"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useNotesStore, Note } from "@/store/notes";
import Sidebar from "@/components/notes/Sidebar";
import NoteCard from "@/components/notes/NoteCard";
import NoteEditor from "@/components/notes/NoteEditor";
import BubbleTeaIllustration from "@/components/illustrations/BubbleTeaIllustration";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, checkAuth, logout } = useAuthStore();
  const { notes, categories, activeCategory, loading, fetchNotes, fetchCategories, setActiveCategory } = useNotesStore();
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchCategories();
    fetchNotes();
  }, [isAuthenticated, router, fetchCategories, fetchNotes]);

  const handleNewNote = () => {
    setEditingNote(null);
    setIsEditorOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingNote(null);
    fetchNotes(activeCategory);
    fetchCategories();
  };

  const handleSelectCategory = (cat: string | null) => {
    setActiveCategory(cat);
  };

  if (!isAuthenticated) return null;

  const isEmpty = notes.length === 0 && !loading;

  return (
    <div className="min-h-screen bg-bg-app">
      <div className="flex items-center justify-end px-6 py-4">
        <button
          onClick={logout}
          className="text-xs text-text-secondary hover:text-text-primary underline mr-4"
        >
          Logout
        </button>
      </div>

      <div className="flex px-6 pb-8 gap-4">
        <Sidebar
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />

        <main className="flex-1 min-w-0">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleNewNote}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border-[1.5px] border-btn-border text-btn-text text-sm font-medium hover:bg-[#F5EFE6] transition-colors"
            >
              <Plus size={16} />
              New Note
            </button>
          </div>

          {isEmpty ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
              <BubbleTeaIllustration className="w-40 h-40 mb-4" />
              <p className="text-base text-text-secondary">
                I&apos;m just here waiting for your charming notes...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {notes.map((note) => (
                <NoteCard key={note.id} note={note} onClick={() => handleEditNote(note)} />
              ))}
            </div>
          )}
        </main>
      </div>

      {isEditorOpen && (
        <NoteEditor
          note={editingNote}
          categories={categories}
          onClose={handleCloseEditor}
          onSave={handleCloseEditor}
        />
      )}
    </div>
  );
}
