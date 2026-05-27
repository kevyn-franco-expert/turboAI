import { create } from 'zustand';
import api from '@/lib/api';

export interface Category {
  id: number;
  name: string;
  color: string;
  border_color: string;
  dot_color: string;
  note_count: number;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  category: Category;
  category_id?: number;
  created_at: string;
  updated_at: string;
}

interface NotesState {
  notes: Note[];
  categories: Category[];
  activeCategory: string | null;
  loading: boolean;
  fetchNotes: (category?: string | null) => Promise<void>;
  fetchCategories: () => Promise<void>;
  createNote: (data: Partial<Note>) => Promise<Note>;
  updateNote: (id: number, data: Partial<Note>) => Promise<Note>;
  deleteNote: (id: number) => Promise<void>;
  setActiveCategory: (category: string | null) => void;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  categories: [],
  activeCategory: null,
  loading: false,
  fetchNotes: async (category?: string | null) => {
    set({ loading: true });
    const params = category ? { category } : {};
    const res = await api.get('/notes/', { params });
    set({ notes: res.data, loading: false });
  },
  fetchCategories: async () => {
    const res = await api.get('/categories/');
    set({ categories: res.data });
  },
  createNote: async (data) => {
    const res = await api.post('/notes/', data);
    await get().fetchNotes(get().activeCategory);
    await get().fetchCategories();
    return res.data;
  },
  updateNote: async (id, data) => {
    const res = await api.patch(`/notes/${id}/`, data);
    await get().fetchNotes(get().activeCategory);
    await get().fetchCategories();
    return res.data;
  },
  deleteNote: async (id) => {
    await api.delete(`/notes/${id}/`);
    await get().fetchNotes(get().activeCategory);
    await get().fetchCategories();
  },
  setActiveCategory: (category) => {
    set({ activeCategory: category });
    get().fetchNotes(category);
  },
}));
