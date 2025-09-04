import type { Notes } from "../../../types";
import { apiCall } from "../../../utils/api";
import type { AddNoteType } from "../../../validation/noteSchema";

export const getNotes = async () => {
  const res = await apiCall<Notes[], null>("/note", "GET", "protected");
  return res.data;
};

export async function createNote(note: AddNoteType) {
  const res = await apiCall<string, AddNoteType>(
    "/note",
    "POST",
    "protected",
    note
  );

  return res.data;
}

export async function deleteNote(id: string) {
  const res = await apiCall<string, null>(`/note/${id}`, "DELETE", "protected");
  return res.data;
}
