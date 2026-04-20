import { useState, useEffect } from "react";
import { createNote, updateNote } from "./api";

function NoteForm({ onNoteCreated, onNoteUpdated, initialData, onCancel }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoriesInput, setCategoriesInput] = useState('');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setContent(initialData.content);
            if (initialData.categories) {
                setCategoriesInput(initialData.categories.map(c => c.name).join(', '));
            } else {
                setCategoriesInput('');
            }
        } else {
            setTitle('');
            setContent('');
            setCategoriesInput('');
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) return alert("Nota incompleta");
        
        const categories = categoriesInput
            .split(',')
            .map(c => c.trim())
            .filter(c => c !== '');

        try {
            if (initialData) {
                await updateNote(initialData.id, { title, content, categories });
                if (onNoteUpdated) onNoteUpdated();
            } else {
                await createNote({ title, content, categories });
                setTitle('');
                setContent('');
                setCategoriesInput('');
                if (onNoteCreated) onNoteCreated();
            }
        } catch (error) {
            console.error("Error al guardar nota", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="glass-card" style={{ marginBottom: '30px' }}>
            <h2 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.5rem', color: 'var(--text-primary)' }}>
                {initialData ? "✏️ Editar Nota" : "✨ Nueva Nota"}
            </h2>
            <input 
                type="text" 
                placeholder="Título" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="glass-input"
            />
            <textarea 
                placeholder="Contenido de la nota..." 
                value={content} 
                onChange={(e) => setContent(e.target.value)}
                className="glass-input"
                style={{ minHeight: '120px', resize: 'vertical' }}
            />
            <input 
                type="text" 
                placeholder="Categorías (separadas por coma)" 
                value={categoriesInput} 
                onChange={(e) => setCategoriesInput(e.target.value)} 
                className="glass-input"
            />
            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                    {initialData ? "Actualizar Nota" : "Guardar Nota"}
                </button>
                {initialData && (
                    <button type="button" onClick={onCancel} className="btn btn-secondary" style={{ flex: 1 }}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}

export default NoteForm;