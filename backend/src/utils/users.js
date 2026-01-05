const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../../data/users.json");

const ensureDataFile = () => {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
};

const loadUsers = () => {
  ensureDataFile();
  const data = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(data);
};

const saveUsers = (users) => {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
};

let users = loadUsers();

module.exports = {
  users,
  saveUsers: () => saveUsers(users)
};
