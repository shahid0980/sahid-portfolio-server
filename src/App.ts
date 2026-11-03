import express, { Request, Response, Application } from "express";
import createInteraction from "./Gemini.js";
import router from "./router/chatRouter.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

const app: Application = express();

// Body parsing middleware
app.disable("x-powered-by");
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", async (req, res, next) => {
  try {
    await pool.query("SELECT 1");
    res.json({ success: true, status: "ok", database: "connected" });
  } catch (error) {
    next(error);
  }
});

app.use(
  "/api/chat",
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 10, // Limit each IP to 10 requests per windowMs
    standardHeaders: "draft-8", // Return standard rate limit headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
      success: false,
      error: { message: "Too many chat requests. Please try again shortly." },
    },
  }),
  router,
);

export default app;
