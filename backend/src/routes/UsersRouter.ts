import { Router, type Request, type Response } from "express";
import { MessagesController } from "../controllers/MessagesController.ts";
import { UsersController } from "../controllers/UsersController.ts";

const UsersRouter = Router();

UsersRouter.get("/receivers", UsersController.getReceivers);
UsersRouter.get("/all", UsersController.getAllUsers);

export default UsersRouter;
