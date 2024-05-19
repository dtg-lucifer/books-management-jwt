import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/user.interface";
import bcrypt from "bcryptjs";
import Joi from "joi";

const UserSchema: Schema = new Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserSchemaJoi = Joi.object({
  userName: Joi.string().min(4).required(),
  password: Joi.string().min(8).required(),
})

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model<IUser>("users", UserSchema);

export { UserModel, UserSchemaJoi };
