import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { Button, Card, CardContent, CircularProgress, IconButton } from "@mui/material";
import { Loader, Trash2 } from "lucide-react";
import { useUser } from "../../context/userContext";
import { createNote, deleteNote, getNotes } from "../../feature/dashboard/api";
import { type AddNoteType } from "../../validation/noteSchema";
import toast from "react-hot-toast";
import type { Notes } from "../../types";


export default function Dashboard() {



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


            const newNote = { ...variables, ...id };

            queryClient.setQueryData(["notes"], (old: any) =>
                old ? [...old, newNote] : [newNote]
            );
            reset();
            setOpen(false);
            toast.success("Task added successfully");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: (data) => {

            queryClient.setQueryData(["notes"], (old: Notes[] | undefined) =>
                old ? old.filter((note) => note.id !== data) : []
            );
            toast.success("Note deleted");
        },
    });

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <CircularProgress />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-red-500 text-center mt-10">Failed to load notes</div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col gap-8 items-center p-4">
            {/* Header */}
            <div className="flex justify-between items-center w-full max-w-md py-4">
                <div className="flex items-center gap-2">
                    <Loader className="text-blue-600" />
                    <h1 className="text-lg font-semibold">Dashboard</h1>
                </div>
                <button onClick={logOut} className="underline text-blue-600">
                    Sign Out
                </button>
            </div>

            {/* Welcome Card */}
            <Card className="w-full max-w-md shadow-md mb-6">
                <CardContent>
                    <h2 className="text-xl font-bold">Welcome, {user?.name} !</h2>
                    <p className="text-gray-500 text-sm">Email: {user?.email}</p>
                </CardContent>
            </Card>

            {/* Create Note Button */}
            <Button
                variant="contained"
                fullWidth
                className="max-w-md mb-6"
                color="primary"
                onClick={() => setOpen(true)}
            >
                Create Note
            </Button>

            {/* Notes List */}
            <div className="w-full max-w-md space-y-3">
                <h3 className="font-semibold text-lg text-gray-700">Notes</h3>
                {data?.map((note) => (
                    <Card key={note.id} className="w-full shadow-sm">
                        <CardContent className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <p className="text-gray-700 text-md">{note.title}</p>
                                <p className="text-gray-400 text-xs">{note.description}</p>
                            </div>

                            <IconButton
                                size="small"
                                onClick={() => deleteMutation.mutate(note.id)}
                                disabled={deleteMutation.isPending}
                            >
                                <Trash2
                                    className={`${deleteMutation.isPending ? "opacity-40" : "text-red-600"
                                        }`}
                                    size={16}
                                />
                            </IconButton>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Create Note Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth className="" maxWidth="sm">
                <DialogTitle >Create a New Note</DialogTitle>
                <form onSubmit={handleSubmit((values) => mutation.mutate(values))}>
                    <DialogContent className="h-60 " >
                        <TextField
                            label="Title"
                            fullWidth
                            {...register("title", { required: true })}
                        />
                        <div className="invisible">for space</div>
                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            rows={3}
                            className=""
                            {...register("description")}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? "Saving..." : "Save"}

                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}


