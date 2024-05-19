import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/user.interface";
import bcrypt from "bcryptjs";

const UserSchema: Schema = new Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

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

export { UserModel };
