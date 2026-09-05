import { z } from 'zod';

export const ReviewSchema = z.object({
  id: z.string().min(1),
  productId: z.string().min(1),
  author: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(1),
  body: z.string().min(1),
  createdAt: z.string().datetime(),
  verified: z.boolean(),
});

export const ReviewsDataSchema = z.array(ReviewSchema);
