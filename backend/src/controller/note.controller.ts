import type { Request, Response } from "express";
import { validateBody } from "../utils/validateData.js";
import { addNoteSchema, type AddNoteType } from "../schema/noteSchema.js";
import prisma from "../lib/prismaClient.js";
import { isUUID } from "../utils/isUuid.js";
import { ApiError } from "../utils/apiError.js";
import { api } from "../routes/router.js";

export const getNotes = async (req: Request, res: Response) => {
  const user = req.userData;

  const notes = await prisma.note.findMany({
    where: {
      userId: user.userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.json({
    success: true,
    message: "notes fetched successfully",
    data: notes,
  });
};

export const addNote = async (req: Request, res: Response) => {
  const validatedData = validateBody<AddNoteType>(addNoteSchema, req.body);

  const user = req.userData;

  const newNote = await prisma.note.create({
    data: {
      userId: user.userId,
      title: validatedData.title,
      description: validatedData.description || null,
    },
  });

  return res.json({
    success: true,
    message: "Note created successfuly",
    data: newNote.id,
  });
};

export const deleteNote = async (req: Request, res: Response) => {
  const { noteId } = req.params;

  if (!noteId || !isUUID(noteId))
    throw new ApiError(400, "Invalid parameters", ["invalid uuid"]);

  const noteExist = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
  });

  if (!noteExist)
    throw new ApiError(404, "Note not found", ["Invalid note id sent"]);

  await prisma.note.delete({
    where: {
      id: noteId,
    },
  });

  return res
    .json({ success: true, message: "Note deleted successfully" })
    .status(200);
};

//Routes
api.get("/note", "protected", getNotes);
api.post("/note", "protected", addNote);
api.delete("/note/:noteId", "protected", deleteNote);
