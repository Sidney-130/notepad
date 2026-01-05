const { notes, saveNotes } = require("../utils/store");

const getNotes = (userId) => {
  return notes.filter((note) => note.userId === userId);
};

const createNote = (userId, text) => {
  if (!text) {
    const error = new Error("Text is required");
    error.statusCode = 400;
    throw error;
  }

  const note = {
    id: Date.now().toString(),
    text,
    userId,
  };

  notes.push(note);
  saveNotes();
  return note;
};

const deleteNote = (userId, noteId) => {
  const index = notes.findIndex((n) => n.userId === userId && n.id === noteId);
  if (index === -1) throw new Error("Note not found");
  const deleted = notes.splice(index, 1)[0];
  saveNotes();
  return deleted;
};

const updateNote = (userId, noteId, text) => {
  const index = notes.findIndex((n) => n.userId === userId && n.id === noteId);
  if (index === -1) throw new Error("Note not found");
  if (!text) throw new Error("Text is required");
  notes[index].text = text;
  saveNotes();
  return notes[index];
};

module.exports = { getNotes, createNote, deleteNote, updateNote };
