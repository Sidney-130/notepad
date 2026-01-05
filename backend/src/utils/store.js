const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../../data/notes.json");

const ensureDataFile = () => {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
};

const loadNotes = () => {
  ensureDataFile();
  const data = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(data);
};

const saveNotes = (notes) => {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2));
};

let notes = loadNotes();

module.exports = {
  notes,
  saveNotes: () => saveNotes(notes)
};
