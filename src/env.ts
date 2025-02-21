import z from 'zod';

const envSchema = z.object({
  POSTGRES_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  REDIS_HASH: z.string(),
});

export const env = envSchema.parse(process.env);
