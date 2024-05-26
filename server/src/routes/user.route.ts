import { Response, Router } from "express";
import { AuthenticatedRequest } from "../types/authenticatedRequest.interface";
import { UserModel } from "../models/users.model";

const userRouter = Router();

userRouter.get(
  "/:id",
  (req: AuthenticatedRequest<{ id: string }, {}, {}, {}>, res: Response) => {
    const { id } = req.params;

    const user = UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  }
);

export { userRouter };
