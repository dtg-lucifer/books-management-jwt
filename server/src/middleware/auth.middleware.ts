import { NextFunction, Response } from "express";
import { JwtPayload } from "../types/jwt.interface";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/authenticatedRequest.interface";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.SECRET || "secret__key";

export const RequireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
