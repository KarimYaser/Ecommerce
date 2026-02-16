import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .pipe(z.email("Invalid email address")),

  password: z.string().nonempty("Password is required"),

  rememberMe: z.boolean().default(false),
});

export type loginFormValues = z.infer<typeof loginSchema>;
