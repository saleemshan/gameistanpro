import { z } from "zod";

export const searchQuerySchema = z.object({
  q: z.string().max(200).optional(),
});

export const ogSearchParamsSchema = z.object({
  title: z.string().max(120).optional(),
  rating: z.string().max(10).optional(),
  subtitle: z.string().max(80).optional(),
});

export type SearchQueryInput = z.infer<typeof searchQuerySchema>;
