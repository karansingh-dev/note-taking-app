import z, { email } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .nonempty("Name required")
    .max(50, "Maximum 50 character allowed"),
  email: z.email("Invalid email address"),
  dob: z.coerce.date(),
});

export const registerUserSchema = z.object({
  email: z.email("Invalid email address"),
  otp: z.string().regex(/^\d{6}$/, "Invalid Otp Format"),
});

export type RegisterData = z.infer<typeof registerUserSchema>;
export type SignUpData = z.infer<typeof signUpSchema>;
