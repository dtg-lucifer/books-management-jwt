import mongoose, { Schema } from "mongoose";
import { IBook } from "../types/book.interface";
import j from "joi";

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  yearPublished: { type: Number, required: true },
});

const BookModel = mongoose.model<IBook>("Book", BookSchema);

const BookSchemaJoi = j.object().keys({
  title: j.string().required(),
  author: j.string().required(),
  genre: j.string().required(),
  yearPublished: j.number().integer().min(1000).max(9999).required()
})

export { BookModel, BookSchemaJoi };
