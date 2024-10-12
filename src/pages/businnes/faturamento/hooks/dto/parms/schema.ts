import { z } from 'zod';

const paginations = z.object({
  pageSize: z.string(),
  pageNumber: z.string(),
});
export const schemaGetTransactions = z
  .object({
    userId: z.string(),
    month: z.number(),
  })
  .merge(paginations);
