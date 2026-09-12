import { z } from 'zod';

import { ProductImageSchema } from './product';

export const CollectionSchema = z.object({
  id: z.string().min(1),
  handle: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  image: ProductImageSchema,
  productIds: z.array(z.string().min(1)),
});

export const CollectionsDataSchema = z.array(CollectionSchema);
