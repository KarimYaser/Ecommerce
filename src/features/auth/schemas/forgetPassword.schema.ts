import { z } from "zod";

export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .pipe(z.email("Invalid email address")),
});

export type forgetPasswordFormValues = z.infer<typeof forgetPasswordSchema>;
