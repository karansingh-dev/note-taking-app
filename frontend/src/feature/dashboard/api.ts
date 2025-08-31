import type { Notes } from "../../types";
import type { AddNoteType } from "../../validation/noteSchema";

export const getNotes = async () => {
  const res = await fetch("http://localhost:5000/api/note", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const result = await res.json();

  return result.data as Notes[];
};

export async function createNote(note: AddNoteType) {
  const res = await fetch("http://localhost:5000/api/note", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to create note");
  const result = await res.json();
  return result.data;
}

export async function deleteNote(id: string) {
  const res = await fetch(`http://localhost:5000/api/note/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete note");
  return id;
}
