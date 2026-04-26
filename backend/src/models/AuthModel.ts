import { pool } from "../db/db.ts";
import { register } from "node:module";

export const AuthModel = {
  async signUpUser(username: string, password: string, name: string) {
    try {
      const { rows } = await pool.query(
        "INSERT INTO users (username, password, name) VALUES ($1, $2, $3) RETURNING id, username, name",
        [username, password, name],
      );
      return rows;
    } catch (error) {
      console.log(`Error ${error} in signUpUser at AuthModel`);
    }
  },
};
