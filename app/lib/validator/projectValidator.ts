import { z } from "zod";


export const ProjectValidator = z.object({
  name: z
    .string({ required_error: "Project name is required" })
    .min(3, "Project name must be at least 3 characters long")
    .max(100, "Project name cannot exceed 100 characters"),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
});


export type ProjectType = z.infer<typeof ProjectValidator>;
