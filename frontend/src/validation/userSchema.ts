import z from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .nonempty("Name required")
    .max(50, "Maximum 50 character allowed"),
  email: z.email("Invalid email address"),
  dob: z.date("Invalid Date"),
});

export const registerUserSchema = z.object({
  email: z.email("Invalid email address"),
  otp: z.string().regex(/^\d{6}$/, "Invalid Otp Format"),
});

export const signInSchema = z.object({
  email: z.email("Invalid email address"),
});

export type signInData = z.infer<typeof signInSchema>;
export type RegisterData = z.infer<typeof registerUserSchema>;
export type SignUpData = z.infer<typeof signUpSchema>;
