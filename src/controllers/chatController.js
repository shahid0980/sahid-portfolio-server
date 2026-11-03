import { env } from "../config/env.js";
import {
  createSession,
  sessionExists,
  saveMessage,
  getRecentMessages
} from "../repositories/chatRepository.js";
import { generatePortfolioAnswer } from "../services/chatService.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const chatController = asyncHandler(async (req, res) => {
  const { message } = req.validatedBody;
  let { sessionId } = req.validatedBody;
  // console.log("Received chat request:", { sessionId, message });

  // Create a new conversation if the visitor has not supplied a session ID.
  if (!sessionId) {
    const session = await createSession();
    sessionId = session.id;
  } else if (!(await sessionExists(sessionId))) {
    return res.status(404).json({
      success: false,
      error: { message: "Conversation not found. Start a new conversation." }
    });
  }

  // Load trusted history from PostgreSQL, not from browser-provided history.
  const history = await getRecentMessages(
    sessionId,
    env.MAX_HISTORY_MESSAGES
  );

  // Generate answer before saving both turns. This avoids storing a user turn
  // without an assistant response if the Gemini request fails.
  const reply = await generatePortfolioAnswer(history, message);

  await saveMessage(sessionId, "user", message);
  await saveMessage(sessionId, "assistant", reply);

  res.status(200).json({
    success: true,
    sessionId,
    reply
  });
});
