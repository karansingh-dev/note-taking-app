import z from "zod";



export const addNoteSchema  = z.object({
    title:z.string().nonempty("required").max(50),
    description:z.string().max(100).optional()
})

export type AddNoteType = z.infer<typeof addNoteSchema>