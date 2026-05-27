"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X } from "lucide-react";
import { Note, Category } from "@/store/notes";
import api from "@/lib/api";
import { useClickOutside } from "@/hooks/useClickOutside";

interface NoteEditorProps {
  note?: Note | null;
  categories: Category[];
  onClose: () => void;
  onSave: () => void;
}

const formatLastEdited = (dateStr: string) => {
  const date = new Date(dateStr);
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  const displayHours = hours % 12 || 12;
  return `Last Edited: ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} at ${displayHours}:${minutes}${ampm}`;
};

export default function NoteEditor({ note, categories, onClose, onSave }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [categoryId, setCategoryId] = useState(note?.category.id || categories[0]?.id);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lastSaved, setLastSaved] = useState(note?.updated_at || new Date().toISOString());
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  const currentCategory = categories.find((c) => c.id === categoryId) || categories[0];

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setCategoryId(note.category.id);
      setLastSaved(note.updated_at);
    } else {
      setTitle("");
      setContent("");
      setCategoryId(categories[0]?.id);
      setLastSaved(new Date().toISOString());
    }
  }, [note, categories]);

  const saveNote = useCallback(async () => {
    try {
      if (note) {
        const res = await api.patch(`/notes/${note.id}/`, {
          title,
          content,
          category_id: categoryId,
        });
        setLastSaved(res.data.updated_at);
      } else {
        if (title.trim() || content.trim()) {
          const res = await api.post("/notes/", {
            title,
            content,
            category_id: categoryId,
          });
          setLastSaved(res.data.updated_at);
          onSave();
        }
      }
    } catch (err) {
      console.error("Autosave failed", err);
    }
  }, [note, title, content, categoryId, onSave]);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveNote();
    }, 700);
    return () => clearTimeout(timer);
  }, [title, content, categoryId, saveNote]);

  const handleCategoryChange = (catId: number) => {
    setCategoryId(catId);
    setIsDropdownOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      <div className="absolute inset-0 bg-bg-app/90" onClick={onClose} />

      <div className="relative w-full max-w-4xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-input-border bg-white text-sm text-text-primary hover:bg-[#F5EFE6] transition-colors"
            >
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: currentCategory?.dot_color }}
              />
              {currentCategory?.name}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-1">
                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#8B6F5C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 rounded-lg border border-input-border bg-bg-app shadow-lg py-1 z-10">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text-primary hover:bg-sidebar-active transition-colors"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: cat.dot_color }}
                    />
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F0E6D6] transition-colors text-text-secondary"
          >
            <X size={20} />
          </button>
        </div>

        <div
          className="rounded-xl p-6 sm:p-8 min-h-[60vh] flex flex-col transition-colors duration-300"
          style={{
            backgroundColor: currentCategory?.color,
            border: `1.5px solid ${currentCategory?.border_color}`,
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note Title"
              className="w-full bg-transparent text-2xl sm:text-3xl placeholder:text-placeholder focus:outline-none"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#3D2B1F" }}
            />
            <span className="text-[10px] text-text-secondary whitespace-nowrap ml-4 mt-1">
              {formatLastEdited(lastSaved)}
            </span>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Pour your heart out..."
            className="w-full flex-1 bg-transparent resize-none placeholder:text-placeholder focus:outline-none text-sm leading-relaxed"
            style={{ color: "#5C3D2E" }}
          />
        </div>
      </div>
    </div>
  );
}
