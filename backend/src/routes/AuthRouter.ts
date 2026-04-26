import { Router, type Request, type Response } from "express";
import { AuthController } from "../controllers/AuthController.ts";

const AuthRouter = Router();

AuthRouter.get("/login", AuthController.getLogin);
AuthRouter.post("/login", AuthController.postLogin);
AuthRouter.post("/signup", AuthController.postSignUp);

export default AuthRouter;
