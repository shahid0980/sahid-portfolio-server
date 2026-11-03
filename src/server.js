import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import { pool } from "./config/db.js";
import chatRoutes from "./routes/chatRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();

app.disable("x-powered-by");
app.use(helmet());
const allowedOrigins = [
  "https://sahid-portfolio-ochre.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header (e.g. server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "10kb" }));



app.get("/api/health", async (req, res, next) => {
  try {
    await pool.query("SELECT 1");
    res.json({ success: true, status: "ok", database: "connected" });
  } catch (error) {
    next(error);
  }
});

app.use("/api/chat", rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    error: { message: "Too many chat requests. Please try again shortly." }
  }
}), chatRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Portfolio chatbot API listening on port ${process.env.PORT}`);
});

async function shutdown() {
  console.log("Shutting down server...");
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
