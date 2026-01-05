import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, createNote, updateNote, deleteNote } from "../api/notes";
import { useAuth } from "../contexts/AuthContext";

export default function NotesList() {
  const { token, logout } = useAuth();
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const queryClient = useQueryClient();

  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(token),
  });

  const createNoteMutation = useMutation({
    mutationFn: (text) => createNote(text, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setText("");
    },
  });

  const updateNoteMutation = useMutation({
    mutationFn: ({ id, text }) => updateNote(id, text, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setEditId(null);
      setEditText("");
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: (id) => deleteNote(id, token),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className=" shadow-md">
        <div className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold ">Notepad</h1>
            <p className="text-sm opacity-90 mt-1">Save and organize ideas</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition font-semibold text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-6">
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-4 items-start transition hover:shadow-lg">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your note here..."
            onKeyPress={(e) => {
              if (e.key === "Enter" && text.trim())
                createNoteMutation.mutate(text);
            }}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm shadow-sm"
          />
          <button
            onClick={() => createNoteMutation.mutate(text)}
            disabled={!text.trim() || createNoteMutation.isPending}
            className="px-6 py-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {createNoteMutation.isPending ? "Adding..." : "Add Note"}
          </button>
        </div>

        {notes?.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              No notes yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Start by creating your first note above.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition-transform transform hover:-translate-y-1"
              >
                {editId === note.id ? (
                  <div className="flex gap-2">
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && editText.trim()) {
                          updateNoteMutation.mutate({
                            id: note.id,
                            text: editText,
                          });
                        }
                      }}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm shadow-sm"
                    />
                    <button
                      onClick={() =>
                        updateNoteMutation.mutate({
                          id: note.id,
                          text: editText,
                        })
                      }
                      disabled={
                        !editText.trim() || updateNoteMutation.isPending
                      }
                      className="px-4 py-2 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition font-medium text-sm shadow"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-2xl hover:bg-gray-300 transition font-medium text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-gray-800 flex-1 text-sm leading-relaxed">
                      {note.text}
                    </p>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditId(note.id);
                          setEditText(note.text);
                        }}
                        className="px-3 py-1.5 text-sm text-indigo-600 hover:bg-indigo-50 rounded-xl transition font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteNoteMutation.mutate(note.id)}
                        disabled={deleteNoteMutation.isPending}
                        className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition font-medium disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
