import { pool } from "../db/db.ts";

export const MessagesModel = {
  async getAll(sender_id: string, receiver_id: string) {
    try {
      const { rows } = await pool.query(
        "SELECT sender_id, receiver_id, content, created_at FROM messages WHERE (sender_id = $1 AND receiver_id=$2) OR (sender_id = $2 AND receiver_id=$1) ORDER BY created_at",
        [sender_id, receiver_id],
      );
      return rows;
    } catch (error) {
      console.log(`Error ${error} in getUser at MessagesModel`);
    }
  },

  async create(sender_id: string, receiver_id: string, content: string) {
    try {
      const { rows } = await pool.query(
        "INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3) RETURNING sender_id, receiver_id, content",
        [sender_id, receiver_id, content],
      );
      return rows;
    } catch (error) {
      console.log(`Error ${error} in create at MessagesModel`);
    }
  },
};
