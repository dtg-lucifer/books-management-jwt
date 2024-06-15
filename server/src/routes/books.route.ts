import { Response, Router } from "express";
import { AuthenticatedRequest } from "../types/authenticatedRequest.interface";
import { BookModel, BookSchemaJoi } from "../models/books.model";
import { RequireAuth } from "../middleware/auth.middleware";

const bookRouter = Router();

bookRouter
  .get("/all", RequireAuth, async (_, res: Response) => {
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
    "/",
    RequireAuth,
    async (
      req: AuthenticatedRequest<
        {},
        {},
        {
          title: string;
          author: string;
          genre: string;
          yearPublished: number;
        },
        {}
      >,
      res: Response
    ) => {
      const { title, author, genre, yearPublished } = req.body;

      const { error } = BookSchemaJoi.validate({
        title,
        author,
        genre,
        yearPublished,
      });

      if (error) {
        return res.status(401).json({
          message: "Validation failed",
          cause: error.details[0].message,
        });
      }

      const newBook = await BookModel.create({
        title,
        author,
        genre,
        yearPublished,
      });

      await newBook.save();

      res.status(200).json(newBook.toJSON());
    }
  )
  .put(
    "/:id",
    RequireAuth,
    async (
      req: AuthenticatedRequest<
        { id: string },
        {},
        {
          title?: string;
          author?: string;
          genre?: string;
        },
        {}
      >,
      res: Response
    ) => {
      const { id } = req.params;
      const { title, author, genre } = req.body;

      if (!title && !author && !genre) {
        return res.status(400).json({ message: "No data to update" });
      }

      const book = await BookModel.findById(id);

      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      title && (book.title = title);
      author && (book.author = author);
      genre && (book.genre = genre);

      await book.save();

      res.status(200).json(book.toJSON());
    }
  )
  .delete(
    "/:id",
    RequireAuth,
    async (
      req: AuthenticatedRequest<{ id: string }, {}, {}, {}>,
      res: Response
    ) => {
      const { id } = req.params;

      const book = await BookModel.findById(id);

      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      await book.deleteOne();

      res.status(200).json({ message: "Book deleted" });
    }
  );

export { bookRouter };
