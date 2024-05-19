import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { bookRouter } from "./routes/books.route";
import dotenv from "dotenv";
import { dbConnect } from "./utils/dbConnect";
import { authRouter } from "./routes/auth.route";
import { erroHandler } from "./middleware/errorhandler.middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

dbConnect();

app.use(erroHandler);

app.use("/auth", authRouter);
app.use("/books", bookRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
