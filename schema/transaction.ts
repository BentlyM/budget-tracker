import { z } from 'zod';

export const CreateTransactionSchema = z.object({
  amount: z.coerce.number().positive().multipleOf(0.01),
  description: z.string().optional(),
  date: z.coerce
    .date()
    .refine((date) => date >= new Date(new Date().setHours(0, 0, 0, 0)), {
      message: 'Date cannot be in the past',
    }),
  category: z.string(),
  type: z.union([z.literal('income'), z.literal('expense')]),
});

export type CreateTransactionSchemaType = z.infer<
  typeof CreateTransactionSchema
>;
