import { type Request, type Response } from "express";
import { AuthModel } from "../models/AuthModel.ts";
import bcrypt from "bcryptjs";
import { UsersModel } from "../models/UsersModel.ts";
import jwt from "jsonwebtoken";
import { MessagesModel } from "../models/MessagesModel.ts";

export const MessagesController = {
  async getAll(req: Request, res: Response) {
    try {
      if (!req.query.sender_id || !req.query.receiver_id) {
        return res
          .status(400)
          .json({ message: "Please provide sender_id and receiver_id" });
      }
      const { sender_id, receiver_id } = req.query;

      const messages = await MessagesModel.getAll(sender_id, receiver_id);

      if (messages === undefined || messages.length === 0) {
        return res.json({
          status: "nok",
          message: "There are no messages between those users.",
        });
      }

      res.json({ messages: messages });
    } catch (error) {
      console.log(`Error ${error} in getAll at MessagesController`);
    }
  },

  async postCreate(req: Request, res: Response) {
    try {
      if (!req.body.sender_id || !req.body.receiver_id || !req.body.content) {
        return res.status(400).json({
          message: "Please provide sender_id, receiver_id and content.",
        });
      }

      const { sender_id, receiver_id, content } = req.body;

      const createdMessage = await MessagesModel.create(
        sender_id,
        receiver_id,
        content,
      );

      if (createdMessage === undefined || createdMessage.length === 0) {
        return res.json({
          status: "nok",
          message: "Unable to create message.",
        });
      }

      return res.json({ status: "ok", message: createdMessage });
    } catch (error) {
      console.log(`Error ${error} in postCreate at MessagesController`);
    }
  },
};
