import { Response, Router } from "express";
import { AuthenticatedRequest } from "../types/authenticatedRequest.interface";
import { BookModel } from "../models/books.model";
import { IBook } from "../types/book.interface";

const bookRouter = Router();

bookRouter
  .get("/all", async (req: AuthenticatedRequest, res: Response) => {
    const books = await BookModel.find();

    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    res.status(200).json(books);
  })
  .get(
    "/:id",
    async (
      req: AuthenticatedRequest<{ id: string }, {}, {}, {}>,
      res: Response
    ) => {
      const { id } = req.params;

      const book = await BookModel.findById(id);

      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      res.status(200).json(book);
    }
  )
  .post(
    "/create",
    async (
      req: AuthenticatedRequest<
        {},
        {},
        {
          title: string;
          author: string;
          genre: string;
          yearPublished: string;
        },
        {}
      >,
      res: Response
    ) => {
      const { title, author, genre, yearPublished } = req.body;
      
			const newBook = await BookModel.create({ title, author, genre, yearPublished })


      await newBook.save()

      res.status(200).json(newBook.toJSON())
    }
  );

export { bookRouter };
