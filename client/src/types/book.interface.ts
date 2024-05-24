import { Document } from "mongoose";

export interface IBook extends Document {
	readonly title: string;
	readonly author: string;
	readonly year: number;
	readonly genre: string;
}