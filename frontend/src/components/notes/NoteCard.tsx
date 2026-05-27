"use client";

import { Note } from "@/store/notes";

interface NoteCardProps {
  note: Note;
  onClick: () => void;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return `${months[date.getMonth()]} ${date.getDate()}`;
};

export default function NoteCard({ note, onClick }: NoteCardProps) {
  return (
    <div
      onClick={onClick}
      className="rounded-xl p-5 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
      style={{
        backgroundColor: note.category.color,
        border: `1px solid ${note.category.border_color}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
          {formatDate(note.updated_at)}
        </span>
        <span className="text-xs text-text-secondary">{note.category.name}</span>
      </div>
      <h3
        className="text-xl mb-2 line-clamp-2"
        style={{ fontFamily: "var(--font-serif)", color: "#3D2B1F" }}
      >
        {note.title || "Untitled Note"}
      </h3>
      <p className="text-sm text-text-primary line-clamp-5 whitespace-pre-line leading-relaxed">
        {note.content || "Note content..."}
      </p>
    </div>
  );
}
