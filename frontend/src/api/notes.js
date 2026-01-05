const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

export const fetchNotes = async (token) => {
  const res = await fetch(`${API_URL}/notes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
};
export const createNote = async (text, token) => {
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) throw new Error("Failed to create notes");
  return res.json();
};

export const deleteNote = async (id, token) => {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete notes");
  return res.json();
};

export const updateNote = async (id, text, token) => {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) throw new Error("Failed to update notes");
  return res.json();
};
