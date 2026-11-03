import { Router } from "express";
import { chatController } from "../controllers/chatController.js";
import { validateChat } from "../middleware/validateChat.js";

const router = Router();

router.post("/message", validateChat, chatController);
// router.post("/message", chatController);
export default router;
