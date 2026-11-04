# Portfolio Chatbot Backend

Backend API for the AI chatbot on [Sahid Khan's portfolio](https://sahid-portfolio-ochre.vercel.app). It receives visitor questions from the React frontend, answers them with Google Gemini using a curated knowledge base about Sahid, and stores chat sessions in PostgreSQL so follow-up questions keep their context.

**Frontend repository:** https://github.com/shahid0980/sahid-portfolio

## Features

- Chat endpoint powered by Google Gemini
- Persistent chat sessions and messages in PostgreSQL
- Server-side conversation history, so the browser only sends the latest message and a `sessionId`
- Editable knowledge base in a single JavaScript file
- Request validation with Zod
- Security headers (Helmet), CORS restricted to your frontend origin, and rate limiting

## Tech Stack

| Area | Technology |
|---|---|
| Runtime | Node.js 20+ (ES modules) |
| Framework | Express 5 |
| AI | Google Gemini (`@google/genai`) |
| Database | PostgreSQL 14+ (`pg`) |
| Validation | Zod |
| Security | Helmet, CORS, express-rate-limit |
| Dev tooling | Nodemon |

## Getting Started

### Prerequisites

- Node.js 20 or newer
- PostgreSQL 14 or newer
- A Google Gemini API key

### 1. Clone and install

```bash
git clone https://github.com/shahid0980/sahid-portfolio-server.git
cd sahid-portfolio-server
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Then edit `.env`:

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Your Google Gemini API key |
| `DATABASE_URL` | PostgreSQL connection string |
| `FRONTEND_ORIGIN` | Allowed frontend origin for CORS. Use a comma-separated list for several origins |
| `DB_SSL` | Set to `true` only if your PostgreSQL provider requires SSL |

### 3. Create the database

```sql
CREATE DATABASE portfolio_chatbot;
```

Then create the tables:

```bash
npm run db:init
```

### 4. Run the server

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the server with Nodemon (auto-reload) |
| `npm start` | Start the server with Node |
| `npm run db:init` | Create the database tables |

## API Reference

### Health check

```
GET /api/health
```

Use this to confirm the server is running.

### Send a chat message

```
POST /api/chat/message
Content-Type: application/json
```

**First message**

```json
{
  "message": "What projects has Sahid built?"
}
```

**Response**

```json
{
  "success": true,
  "sessionId": "a-valid-uuid",
  "reply": "Sahid has worked on..."
}
```

**Follow-up message** — send back the `sessionId` you received:

```json
{
  "sessionId": "the-session-id-returned-earlier",
  "message": "Which technologies did he use for the first project?"
}
```

The server loads recent conversation history from PostgreSQL, so do not send history from the browser.

**Errors** return a non-2xx status with a body containing `error.message`.

## Frontend Integration

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

Keep the returned `sessionId` in React state and send it with each new message. To keep the conversation across page refreshes, store it in `sessionStorage` or `localStorage`.

The `sessionId` identifies a conversation. It is not an authentication mechanism, so add ownership controls if you ever expose private user data.

## Updating the Chatbot's Knowledge

Edit `src/data/knowledgeBase.js`. The chatbot treats this file as its single source of truth, so only include information you want to be public.

This project intentionally uses a simple knowledge-base file rather than vector embeddings or RAG. Consider adding those only if the portfolio content grows substantially. Chat sessions and messages are stored in PostgreSQL, but the knowledge base is not.

## Project Structure

```
sahid-portfolio-server/
├── src/
│   ├── server.js            # Application entry point
│   ├── data/
│   │   └── knowledgeBase.js # Public information the chatbot answers from
│   └── scripts/
│       └── initDb.js        # Database table setup (npm run db:init)
├── .gitignore
├── package.json
└── README.md
```

## Production Checklist

- Never commit `.env`. Keep the Gemini API key on the backend only.
- Set `FRONTEND_ORIGIN` to the exact deployed frontend origin(s).
- Enable `DB_SSL=true` only if your PostgreSQL provider requires it.
- Serve the API over HTTPS.
- Review the rate limits and add abuse monitoring.
- For multi-instance deployments, use a shared rate-limit store.
- Use a managed PostgreSQL provider and schedule backups.
- Set a retention policy for stored chat messages, and add deletion support if needed.
- If visitors may share personal data in chat, update your privacy notice.

## Author

**Sahid Khan** — Dubai, UAE

- Portfolio: https://sahid-portfolio-ochre.vercel.app
- GitHub: https://github.com/shahid0980

## License

©sahid khan