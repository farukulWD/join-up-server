import { z } from "zod";

const eventValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Event title is required" }),
    date: z.string().min(1, { message: "Event date is required" }),
    time: z.string().min(1, { message: "Event time is required" }),
    location: z.string().min(1, { message: "Event location is required" }),
    description: z.string().optional(),
    postedBy: z.string().min(1, { message: "Event posted by id is required" }),
  }),
});

export { eventValidationSchema };
