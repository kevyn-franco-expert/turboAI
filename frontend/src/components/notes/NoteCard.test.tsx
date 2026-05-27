import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import NoteCard from './NoteCard'
import type { Note } from '@/store/notes'

const mockNote: Note = {
  id: 1,
  title: 'Grocery List',
  content: '• Milk\n• Eggs',
  category: {
    id: 1,
    name: 'Random Thoughts',
    color: '#F4C2A1',
    border_color: '#E8A87C',
    dot_color: '#E07A5F',
    note_count: 3,
  },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

describe('NoteCard', () => {
  it('renders note title and content', () => {
    render(<NoteCard note={mockNote} onClick={() => {}} />)
    expect(screen.getByText('Grocery List')).toBeInTheDocument()
    expect(screen.getByText(/Milk/)).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<NoteCard note={mockNote} onClick={handleClick} />)
    fireEvent.click(screen.getByText('Grocery List'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('displays category name', () => {
    render(<NoteCard note={mockNote} onClick={() => {}} />)
    expect(screen.getByText('Random Thoughts')).toBeInTheDocument()
  })
})
