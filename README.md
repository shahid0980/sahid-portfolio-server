# Portfolio Chatbot Backend

Node.js + Express + Google Gemini + PostgreSQL backend for Sahid Khan's React portfolio chatbot.

## 1. Requirements

- Node.js 20 or newer
- PostgreSQL 14 or newer
- A Google Gemini API key

## 2. Install

```bash
npm install
cp .env.example .env
```

On Windows PowerShell, use:

```powershell
Copy-Item .env.example .env
```

Edit `.env` and set `GEMINI_API_KEY`, `DATABASE_URL`, and `FRONTEND_ORIGIN`.

Create the database in PostgreSQL:

```sql
CREATE DATABASE portfolio_chatbot;
```

Then initialize the tables:

```bash
npm run db:init
```

## 3. Run locally

```bash
npm run dev
```

Health check:

`GET http://localhost:5000/api/health`

Chat endpoint:

`POST http://localhost:5000/api/chat/message`

Example request:

```json
{
  "message": "What projects has Sahid built?"
}
```

Example response:

```json
{
  "success": true,
  "sessionId": "a-valid-uuid",
  "reply": "Sahid has worked on..."
}
```

For a follow-up, send the returned `sessionId`:

```json
{
  "sessionId": "the-session-id-returned-earlier",
  "message": "Which technologies did he use for the first project?"
}
```

The backend loads recent conversation history from PostgreSQL. Do not send conversation history from the browser.

## 4. React integration

```js
const API_URL = "http://localhost:5000";

export async function sendChatMessage(message, sessionId) {
  const response = await fetch(`${API_URL}/api/chat/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, sessionId })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Chat request failed");
  }

  return data; // { success, sessionId, reply }
}
```

Keep the returned `sessionId` in React state and send it with the next message. For persistence across page refreshes, store it in sessionStorage or localStorage. The session ID is an identifier, not an authentication mechanism; add ownership controls if you later expose private user data.

## 5. Update Sahid's information

Edit `src/data/knowledgeBase.js`. The chatbot uses this file as its source of truth. Only include information intended to be public.

## 6. Production checklist

- Never commit `.env`; keep the Gemini API key on the backend.
- Set `FRONTEND_ORIGIN` to the exact deployed frontend origin(s), comma-separated if needed.
- Enable `DB_SSL=true` only when required by your PostgreSQL provider.
- Use HTTPS in production.
- Review rate limits and add abuse monitoring.
- Set a data-retention policy for stored chat messages; add deletion support if needed.
- If visitor messages may contain personal data, update your privacy notice.
- Use a managed PostgreSQL provider and back up the database.
- For multi-instance production deployments, consider a shared rate-limit store.
- The simple knowledge-base approach does not use vector embeddings or RAG. Add those only if the portfolio content grows substantially.

## Notes

This project stores chat sessions and messages in PostgreSQL. It does not store the knowledge base in the database; the editable JavaScript knowledge-base file is intentionally simple for a personal portfolio.
