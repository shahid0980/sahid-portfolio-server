import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  // FRONTEND_ORIGIN: z.string().default("https://vercel.com/shahid-dev1/sahid-portfolio"),
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required"),
  GEMINI_MODEL: z.string().default("gemini-2.5-flash"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  DB_SSL: z.enum(["true", "false"]).default("false"),
  MAX_HISTORY_MESSAGES: z.coerce.number().int().min(0).max(30).default(12)
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = {
  ...parsed.data,
  DB_SSL: parsed.data.DB_SSL === "true"
};
