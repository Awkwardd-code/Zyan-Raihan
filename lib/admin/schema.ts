import { z } from "zod";

const optionalUrl = z.string().trim().optional().default("");

export const projectSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  slug: z.string().trim().min(1, "Slug is required"),
  client: z.string().trim().optional().default(""),
  category: z.string().trim().optional().default(""),
  year: z.coerce.number().int().min(2000).max(2100).default(new Date().getFullYear()),
  summary: z.string().trim().min(1, "Summary is required"),
  deliverables: z.array(z.string().trim()).default([]),
  outcome: z.array(z.string().trim()).default([]),
  link: z.string().trim().optional().default(""),
  thumbnail: optionalUrl,
  hero: optionalUrl,
  featured: z.coerce.boolean().default(false),
  order: z.coerce.number().int().default(0),
  status: z.enum(["draft", "published"]).default("draft"),
});

export const testimonialSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  role: z.string().trim().optional().default(""),
  company: z.string().trim().optional().default(""),
  quote: z.string().trim().min(1, "Quote is required"),
  avatar: optionalUrl,
  featured: z.coerce.boolean().default(false),
  status: z.enum(["draft", "published"]).default("draft"),
});

export const resourceSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  slug: z.string().trim().min(1, "Slug is required"),
  category: z.string().trim().optional().default(""),
  description: z.string().trim().min(1, "Description is required"),
  meta: z.string().trim().optional().default(""),
  image: optionalUrl,
  href: z.string().trim().optional().default(""),
  featured: z.coerce.boolean().default(false),
  status: z.enum(["draft", "published"]).default("draft"),
});

export const serviceSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  shortDescription: z.string().trim().min(1, "Short description is required"),
  description: z.string().trim().min(1, "Description is required"),
  icon: z.string().trim().optional().default(""),
  featured: z.coerce.boolean().default(false),
  status: z.enum(["draft", "published"]).default("draft"),
});

export const subscriberSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  source: z.string().trim().optional().default("website"),
  consent: z.coerce.boolean().default(true),
  createdAt: z.string().datetime().optional(),
});

export const messageSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Please enter a valid email"),
  subject: z.string().trim().optional().default(""),
  message: z.string().trim().min(1, "Message is required"),
  read: z.coerce.boolean().default(false),
  createdAt: z.string().datetime().optional(),
});
