import { query } from "../config/db.js";

export async function createSession() {
  const result = await query(
    "INSERT INTO chat_sessions DEFAULT VALUES RETURNING id, created_at",
    []
  );
  return result.rows[0];
}

export async function sessionExists(sessionId) {
  const result = await query(
    "SELECT id FROM chat_sessions WHERE id = $1",
    [sessionId]
  );
  return result.rowCount > 0;
}

export async function saveMessage(sessionId, role, content) {
  const result = await query(
    `INSERT INTO chat_messages (session_id, role, content)
     VALUES ($1, $2, $3)
     RETURNING id, role, content, created_at`,
    [sessionId, role, content]
  );
  return result.rows[0];
}

export async function getRecentMessages(sessionId, limit) {
  const result = await query(
    `SELECT role, content
     FROM (
       SELECT role, content, created_at, id
       FROM chat_messages
       WHERE session_id = $1
       ORDER BY created_at DESC, id DESC
       LIMIT $2
     ) recent
     ORDER BY created_at ASC, id ASC`,
    [sessionId, limit]
  );

  return result.rows;
}
