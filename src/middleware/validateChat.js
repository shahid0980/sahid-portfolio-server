import { z } from "zod";

const chatSchema = z.object({
  sessionId: z.string().uuid().optional(),
  message: z.string().trim().min(1).max(200),
  // Client history is intentionally not accepted. The server loads history from PostgreSQL.
});

export function validateChat(req, res, next) {
  const result = chatSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: {
        message: "Invalid request. Provide a message (maximum 200 characters) and an optional valid sessionId.",
        details: result.error.flatten().fieldErrors
      }
    });
  }

  req.validatedBody = result.data;
  next();
}
