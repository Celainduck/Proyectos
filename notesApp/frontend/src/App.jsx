import React, { useEffect, useState } from 'react'
import { getNotes, deleteNote, updateNote } from './api'
import NoteForm from './NoteForm'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [viewArchived, setViewArchived] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const fetchNotes = () => {
    getNotes(viewArchived)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : []
        setNotes(data)
      })
      .catch(err => {
        console.error("Error al buscar notas:", err)
        setNotes([])
      })
  }

  useEffect(() => {
    fetchNotes()
    setSelectedCategory(null) // Reset category filter when switching tabs
  }, [viewArchived])

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar esta nota?")) {
      try {
        await deleteNote(id)
        fetchNotes()
      } catch (error) {
        console.error("Error al eliminar nota:", error)
      }
    }
  }

  const handleToggleArchive = async (note) => {
    try {
      await updateNote(note.id, { isArchived: !note.isArchived })
      fetchNotes()
    } catch (error) {
      console.error("Error al archivar nota:", error)
    }
  }

  const handleEdit = (note) => {
    setEditingNote(note)
  }

  const availableCategories = Array.from(
    new Set(notes.flatMap(note => note.categories?.map(c => c.name) || []))
  )

  const displayedNotes = selectedCategory 
    ? notes.filter(note => note.categories?.some(c => c.name === selectedCategory))
    : notes

  // Lighter, warmer rainbow colors for pills
  const getCategoryColor = (categoryName) => {
    const WARM_COLORS = ['#ff8cbe', '#ffb6b9', '#ffcda3', '#ffd8a8', '#fce38a', '#eaea7f', '#a8e6cf']
    const index = availableCategories.indexOf(categoryName)
    return WARM_COLORS[index % WARM_COLORS.length]
  }

  return (
    <div className="app-container">
      <h1 className="app-header"><span className="gradient-text">Mis Notas</span> 📝</h1>
      
      <NoteForm 
        onNoteCreated={fetchNotes} 
        onNoteUpdated={() => {
          setEditingNote(null)
          fetchNotes()
        }}
        initialData={editingNote}
        onCancel={() => setEditingNote(null)}
      />

      <div className="tabs-container">
        <button 
          className={`tab-btn ${!viewArchived ? 'active' : ''}`}
          onClick={() => setViewArchived(false)} 
        >
          Notas Activas
        </button>
        <button 
          className={`tab-btn ${viewArchived ? 'active' : ''}`}
          onClick={() => setViewArchived(true)} 
        >
          Notas Archivadas
        </button>
      </div>

      {availableCategories.length > 0 && (
        <div className="filter-section">
          <div className="filter-title">Filtrar por Categoría:</div>
          <div className="pill-container">
            <button 
              className={`pill pill-all ${selectedCategory === null ? 'active' : ''}`}
              onClick={() => setSelectedCategory(null)}
            >
              Todas
            </button>
            {availableCategories.map(cat => {
              const color = getCategoryColor(cat)
              const isSelected = selectedCategory === cat
              return (
                <button 
                  key={cat}
                  className="pill"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    backgroundColor: isSelected ? color : `${color}88`,
                    color: isSelected ? '#333' : '#666',
                    borderColor: isSelected ? '#fff' : 'transparent',
                    boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>
      )}
      
      <div className="note-list">
        {displayedNotes.length > 0 ? (
          displayedNotes.map(note => (
            <div key={note.id} className="glass-card">
              <h3 className="note-title">{note.title}</h3>
              <p className="note-content">{note.content}</p>
              
              {note.categories && note.categories.length > 0 && (
                <div className="note-categories">
                  {note.categories.map(cat => {
                    const color = getCategoryColor(cat.name)
                    return (
                      <span key={cat.id} className="pill" style={{ backgroundColor: color, color: '#333' }}>
                        {cat.name}
                      </span>
                    )
                  })}
                </div>
              )}

              <div className="note-actions">
                <button className="btn btn-secondary" onClick={() => handleEdit(note)}>
                  Editar
                </button>
                <button className="btn btn-secondary" onClick={() => handleToggleArchive(note)}>
                  {note.isArchived ? "Desarchivar" : "Archivar"}
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(note.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            No hay notas {viewArchived ? 'archivadas' : 'activas'} {selectedCategory && `para la categoría "${selectedCategory}"`}.
          </div>
        )}
      </div>
    </div>
  )
}

export default App