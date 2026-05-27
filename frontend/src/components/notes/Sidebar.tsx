"use client";

import { Category } from "@/store/notes";

interface SidebarProps {
  categories: Category[];
  activeCategory: string | null;
  onSelectCategory: (cat: string | null) => void;
}

export default function Sidebar({ categories, activeCategory, onSelectCategory }: SidebarProps) {
  const totalNotes = categories.reduce((sum, cat) => sum + (cat.note_count || 0), 0);

  return (
    <aside className="w-[200px] flex-shrink-0 pr-4">
      <div className="mb-4">
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full text-left text-xs font-bold mb-2 px-2 py-1 rounded-md transition-colors ${
            activeCategory === null ? "bg-sidebar-active" : "hover:bg-sidebar-active/50"
          }`}
          style={{ color: "#3D2B1F" }}
        >
          All Categories
        </button>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => onSelectCategory(cat.name)}
                className={`w-full flex items-center justify-between text-left text-[13px] px-2 py-1.5 rounded-md transition-colors ${
                  activeCategory === cat.name ? "bg-sidebar-active" : "hover:bg-sidebar-active/50"
                }`}
                style={{ color: "#5C3D2E" }}
              >
                <span className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: cat.dot_color }}
                  />
                  {cat.name}
                </span>
                <span className="text-text-secondary text-[13px]">{cat.note_count || 0}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
