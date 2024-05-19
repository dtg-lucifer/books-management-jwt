import { Document } from "mongoose";

export interface IUser extends Document {
	userName: string;
	password: string;
	comparePassword(candidatePassword: string): Promise<boolean>;
}