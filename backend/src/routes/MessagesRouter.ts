import { Router, type Request, type Response } from "express";
import { MessagesController } from "../controllers/MessagesController.ts";

const MessagesRouter = Router();

MessagesRouter.get("/all", MessagesController.getAll);
MessagesRouter.post("/create", MessagesController.postCreate);

export default MessagesRouter;
