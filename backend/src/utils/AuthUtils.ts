import jwt from "jsonwebtoken";
import { type NextFunction, type Request, type Response } from "express";

const extractBearerToken = (headerValue: string) => {
  if (typeof headerValue !== "string") {
    return false;
  }

  const matches = headerValue.match(/(bearer)\s+(\S+)/i);
  return matches && matches[2];
};

// The middleware
export const checkTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token =
    req.headers.authorization && extractBearerToken(req.headers.authorization);

  if (!token) {
    return res.status(401).json({ message: "need a token" });
  }

  const secret = process.env.SECRET as string;

  if (!secret) {
    console.error("Erro: SECRET não definida no .env");
    return res.status(500).json({ message: "Internal server error" });
  }

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decodedToken;

    next();
  });
};
