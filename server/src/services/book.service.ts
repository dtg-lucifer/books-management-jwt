import { MongooseError } from "mongoose";
import { BookModel } from "../models/books.model";
import { IBook } from "../types/book.interface";

export const getBook = async ({ id }: { id: string }) => {
  let book: IBook | null;
  try {
    book = await BookModel.findById(id);
    if (book === null) {
      return new MongooseError("Cannot find book");
    }
  } catch (err) {
    // @ts-ignore
    return new Error(err.message);
  }
  
	return book;
};
