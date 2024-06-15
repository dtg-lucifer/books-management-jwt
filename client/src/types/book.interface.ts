import { Document } from "mongoose";

export interface IBook extends Document {
	readonly title: string;
	readonly author: string;
	readonly yearPublished: number;
	readonly genre: string;
}