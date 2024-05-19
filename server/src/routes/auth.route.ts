import { Request, Response, Router } from "express";
import { UserModel } from "../models/users.model";
import jwt from "jsonwebtoken";

const authRouter = Router();

const JWT_SECRET = process.env.SECRET || "secret__key";
const JWT_EXIRATION = process.env.EXPIRY || "1d";

authRouter
  .post("/register", async (req: Request, res: Response) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    try {
      const userExists = await UserModel.findOne({ userName });
      if (userExists) {
        return res.status(400).json({ message: "User already exists !!" });
      }
      const user = new UserModel({ userName, password });
      await user.save();
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: JWT_EXIRATION,
      });
      res.json({ token });
    } catch (err) {
      // @ts-ignore
      res.status(500).json({ message: err.message });
    }
  })

  .post("/login", async (req: Request, res: Response) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    try {
      const user = await UserModel.findOne({ userName });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: JWT_EXIRATION,
      });
      res.json({ token });
    } catch (err) {
      // @ts-ignore
      res.status(500).json({ message: err.message });
    }
  });

export { authRouter };
