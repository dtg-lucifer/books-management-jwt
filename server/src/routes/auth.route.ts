import { Request, Response, Router } from "express";
import { UserModel, UserSchemaJoi } from "../models/users.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JwtPayload } from "../types/jwt.interface";

dotenv.config();

const authRouter = Router();

const JWT_SECRET = process.env.SECRET!;
const JWT_EXPIRATION = process.env.EXPIRY!;

authRouter
  .post("/register", async (req: Request, res: Response) => {
    const { userName, password } = req.body;

    const { error } = UserSchemaJoi.validate({ userName, password });

    if (error) {
      const cause = error.details.map(detail => detail.message).join(", ");
      return res
        .status(400)
        .json({ message: "Username and password are required", cause });
    }

    try {
      const userExists = await UserModel.findOne({ userName });
      if (userExists) {
        return res.status(400).json({ message: "User already exists !!" });
      }
      const user = new UserModel({ userName, password });
      await user.save();
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
      });

      res.cookie("SESSION", token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  })
  .post("/login", async (req: Request, res: Response) => {
    const { userName, password } = req.body;

    const { error } = UserSchemaJoi.validate({ userName, password });

    if (error) {
      const cause = error.details.map(detail => detail.message).join(", ");
      return res
        .status(400)
        .json({ message: "Username and password are required", cause });
    }

    try {
      const user = await UserModel.findOne({ userName });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
      });

      res.cookie("SESSION", token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  })
  .get("/me", async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      const user = await UserModel.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ user: user.toJSON() });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  });

export { authRouter };
