import mongoose, { Schema } from "mongoose";
import { IBook } from "../types/book.interface";

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  yearPublished: { type: Number, required: true },
});

const BookModel = mongoose.model<IBook>("Book", BookSchema);

export { BookModel };
