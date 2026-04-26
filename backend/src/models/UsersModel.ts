import { pool } from "../db/db.ts";

export const UsersModel = {
  async getUserWithPassword(username: string) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
      );
      return rows;
    } catch (error) {
      console.log(`Error ${error} in getUserWithPassword at AuthModel`);
    }
  },

  async getUserWithoutPassword(username: string) {
    try {
      const { rows } = await pool.query(
        "SELECT id, username, name FROM users WHERE username = $1",
        [username],
      );
      return rows;
    } catch (error) {
      console.log(`Error ${error} in getUserWithoutPassword at AuthModel`);
    }
  },

  async getAllReceivers(sender_id: string) {
    try {
      const { rows } = await pool.query(
        `WITH receivers as (
SELECT m.receiver_id, m.sender_id, max(m.created_at) last_message_time
FROM messages m
WHERE (m.sender_id = $1 OR m.receiver_id = $1)
GROUP BY m.sender_id, m.receiver_id
)
SELECT id receiver_id, username, name
FROM(
		SELECT r.sender_id id, u.username, u.name, r.last_message_time 
		FROM receivers r
		JOIN users u on u.id=r.sender_id
		WHERE r.sender_id != $1
			UNION 
		SELECT r.receiver_id id, u.username, u.name, r.last_message_time 
		FROM receivers r
		JOIN users u on u.id=r.receiver_id
		WHERE r.receiver_id != $1
	)
GROUP BY id, username, name
ORDER BY MAX(last_message_time) desc`,
        [sender_id],
      );
      return rows;
    } catch (error) {
      console.log(`Error ${error} in getUser at AuthModel`);
    }
  },

  async getAllUsers() {
    try {
      const { rows } = await pool.query(
        `SELECT id as "receiver_id", username, name FROM users`,
      );
      return rows;
    } catch (error) {
      console.log(`Error ${error} in getAllUsers at UsersModel`);
    }
  },
};
