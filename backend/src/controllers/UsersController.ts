import { type Request, type Response } from "express";
import { UsersModel } from "../models/UsersModel.ts";

export const UsersController = {
  async getReceivers(req: Request, res: Response) {
    try {
      if (!req.query.sender_id) {
        return res
          .status(400)
          .json({ message: "Please provide sender_id in query params." });
      }

      const sender_id = req.query.sender_id;

      const receivers = await UsersModel.getAllReceivers(sender_id);

      if (receivers === undefined || receivers.length === 0) {
        return res.json({
          status: "nok",
          message: "User has no messages with anyone.",
        });
      }

      res.json({ status: "ok", receivers: receivers });
    } catch (error) {
      console.log(`Error ${error} in getReceivers at UsersController`);
    }
  },
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UsersModel.getAllUsers();
      if (users === undefined || users.length === 0) {
        return res.json({
          status: "nok",
          message: "There are no users.",
        });
      }

      res.json({ status: "ok", users: users });
    } catch (error) {
      console.log(`Error ${error} in getAllUsers at UsersController`);
    }
  },
};
