import { z } from "zod";

export const intakeSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\d\s()+-]+$/, "Please enter a valid phone number"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
});

export type IntakeData = z.infer<typeof intakeSchema>;

export const responseEntry = z.object({
  questionId: z.string(),
  answer: z.string().min(1),
});

export const consultSubmission = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  dateOfBirth: z.string().min(1),
  timezone: z.string().min(1),
  responses: z.array(responseEntry).min(1),
});

export type ConsultSubmission = z.infer<typeof consultSubmission>;
