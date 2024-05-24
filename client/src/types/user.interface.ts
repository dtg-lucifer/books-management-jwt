import { Document } from 'mongoose';

export interface IUser extends Document {
	readonly userName: string;
	readonly password: string;
	comparePassword(candidatePassword: string): Promise<boolean>;
}