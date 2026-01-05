const noteService = require("../services/noteService");

const getNotes = (req, res, next) => {
  try {
    const notes = noteService.getNotes(req.user.id);
    res.json(notes);
  } catch (err) {
    next(err);
  }
};
const createNote = (req, res, next) => {
  try {
    console.log("Recieved body:", req.body);
    const note = noteService.createNote(req.user.id, req.body.text);
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};
const deleteNote = (req, res, next) => {
  try {
    const note = noteService.deleteNote(req.user.id, req.params.id);
    res.json(note);
  } catch (err) {
    next(err);
  }
};
const updateNote = (req, res, next) => {
  try {
    const note = noteService.updateNote(
      req.user.id,
      req.params.id,
      req.body.text
    );
    res.json(note);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
};
