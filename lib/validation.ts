import { z } from "zod";

export const UserFormValidation = z.object({
  fullName: z
    .string()
    .min(2, "Must be at least 2 characters")
    .max(50, "Must be at most 50 characters")
    .nonempty("Full name is required"),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});
