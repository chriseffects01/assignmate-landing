import { z } from 'zod';

export const registerUpSchema = z.object({
  username: z.string().min(2).max(255).trim(),
  email: z.email().max(255).toLowerCase().trim(),
  password: z.string().min(6).max(128),
  role: z.enum('user', 'admin').default('user'),
});

export const loginSchema = z.object({
  email: z.email().toLowerCase().trim(),
  password: z.string().min(1),
});
