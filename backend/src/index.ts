import * as dotenv from "dotenv";
dotenv.config();
import express, { type Request, type Response } from "express";

import AuthRouter from "./routes/AuthRouter.ts";
import { checkTokenMiddleware } from "./utils/AuthUtils.ts";
import MessagesRouter from "./routes/MessagesRouter.ts";
import UsersRouter from "./routes/UsersRouter.ts";
import cors from "cors";

const app = express();
const PORT = 3000;
app.use(cors());

app.use(express.json());

app.use("/auth", AuthRouter);
app.use("/messages", MessagesRouter);
app.use("/users", UsersRouter);

app.get("/protected", checkTokenMiddleware, (req: Request, res: Response) => {
  return res.json({ ola: `Bem sucedido, ${req.user.username}` });
});

//app.use(checkTokenMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Backend rodando com TypeScript e Imports!" });
});

app.listen(PORT, () => {
  console.log(`⚡️ Server rodando em http://localhost:${PORT}`);
});
