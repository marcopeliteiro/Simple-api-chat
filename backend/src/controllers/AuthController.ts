import { type Request, type Response } from "express";
import { AuthModel } from "../models/AuthModel.ts";
import bcrypt from "bcryptjs";
import { UsersModel } from "../models/UsersModel.ts";
import jwt from "jsonwebtoken";

export const AuthController = {
  async getLogin(req: Request, res: Response) {
    try {
    } catch (error) {}
  },

  async postLogin(req: Request, res: Response) {
    try {
      if (!req.body.username || !req.body.password) {
        return res
          .status(400)
          .json({ message: "Please provide username and password" });
      }
      const { username, password } = req.body;

      const user = await UsersModel.getUserWithPassword(username);

      if (user.length === 0) {
        return res.json({ status: "nok", message: "User doesn't exist." });
      }

      const match = await bcrypt.compare(password, user[0].password);
      if (!match) {
        // passwords do not match!
        return res.json({ status: "nok", error: "Wrong password." });
      }

      const token = jwt.sign(
        {
          sub: user[0].id,
          user_id: user[0].id,
          username: user[0].username,
        },
        process.env.SECRET as string,
        { expiresIn: "3 hours" },
      );

      const userInfo = {
        id: user[0].id,
        username: user[0].username,
        name: user[0].name,
      };

      res.json({ status: "ok", token: token, user: userInfo });
    } catch (error) {
      console.log(`Error ${error} in postLogin at AuthController`);
    }
  },

  async postSignUp(req: Request, res: Response) {
    try {
      if (!req.body.username || !req.body.password || !req.body.name) {
        return res
          .status(400)
          .json({ message: "Please provide username, password and name" });
      }
      const { username, password, name } = req.body;

      const user = await UsersModel.getUserWithPassword(username);

      if (user.length !== 0) {
        return res.json({ message: "User already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const userCreated = await AuthModel.signUpUser(
        username,
        hashedPassword,
        name,
      );

      console.log(userCreated);

      if (userCreated.length > 0) {
        return res.json({
          message: `Created user with username ${userCreated[0]?.username}`,
        });
      }
    } catch (error) {}
  },
};
