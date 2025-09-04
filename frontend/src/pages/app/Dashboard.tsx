
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { Button, Card, CardContent, CircularProgress, IconButton } from "@mui/material";
import { Trash2 } from "lucide-react";
import { useDashboard } from "../../feature/dashboard/hooks/useDashboard";



export default function Dashboard() {

    const { notes,
        isLoading,
        isError,


        user,
        logOut,


        open,
        setOpen,
        register,
        handleSubmit,


        // mutations
        mutation,
        deleteMutation, } = useDashboard();



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
                    <img src="/logo-ico.png" alt="logo" className="h-8 w-8" />

                    <h1 className="text-lg font-semibold">Dashboard</h1>
                </div>
                <Button onClick={logOut} variant="outlined" className=" text-blue-600">
                    Sign Out
                </Button>
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
                {notes?.length === 0 &&
                    <div className="text-gray-500 text-sm text-center py-4">
                        No notes yet, try creating a new one
                    </div>
                }
                {notes?.map((note) => (
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


