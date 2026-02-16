import { z } from "zod";

export const checkoutSchema = z.object({
  details: z
    .string({ message: "Address details is required" })
    .min(3, "Address details must be at least 3 characters"),
  phone: z
    .string({ message: "Phone number is required" })
    .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
  city: z
    .string({ message: "City name is required" })
    .min(2, "City name must be at least 2 characters"),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
