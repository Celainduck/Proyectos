import axios from 'axios';
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
})

export const getNotes = (archived = false, category = '') => {
  const url = category ? `/notes?archived=${archived}&category=${category}` : `/notes?archived=${archived}`;
  return API.get(url);
};
export const createNote = (note) => API.post('/notes', note);
export const updateNote = (id, note) => API.patch(`/notes/${id}`, note);
export const deleteNote = (id) => API.delete(`/notes/${id}`);