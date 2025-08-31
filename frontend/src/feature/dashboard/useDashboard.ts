import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useUser } from "../../context/userContext";
import type { Notes } from "../../types";
import type { AddNoteType } from "../../validation/noteSchema";
import { getNotes, createNote, deleteNote } from "./api";

export function useDashboard() {
  const { data, isLoading, isError } = useQuery({
    queryFn: getNotes,
    queryKey: ["notes"],
  });

  const { user, logOut } = useUser();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<AddNoteType>({
    defaultValues: { title: "", description: "" },
  });

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: (id, variables) => {
      const newNote = { id, ...variables };

      queryClient.setQueryData(["notes"], (old: Notes[]) =>
        old ? [...old, newNote] : [newNote]
      );
      reset();
      setOpen(false);
      toast.success("Task added successfully");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: (_data, variables) => {
      const id = variables;
      queryClient.setQueryData(["notes"], (old: Notes[]) =>
        old ? old.filter((note) => note.id !== id) : []
      );
      toast.success("Note deleted");
    },
  });

  return {
    // query state
    notes: data,
    isLoading,
    isError,

    // user
    user,
    logOut,

    // modal/form
    open,
    setOpen,
    register,
    handleSubmit,

    // mutations
    mutation,
    deleteMutation,
  };
}
