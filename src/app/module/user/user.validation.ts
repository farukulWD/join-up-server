import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }).optional(),
    email: z.string().email({ message: "Email is required" }),
    photoURL: z.string({ message: "Photo url required" }),
    password: z
      .string()
      .min(6, { message: "Password minimum six characters length" }),
  }),
});

// For use in request validation middleware

export { userValidationSchema };
