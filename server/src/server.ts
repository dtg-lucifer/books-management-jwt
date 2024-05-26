import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { bookRouter } from "./routes/books.route";
import dotenv from "dotenv";
import { dbConnect } from "./utils/dbConnect";
import { authRouter } from "./routes/auth.route";
import { errorHandler } from "./middleware/errorhandler.middleware";
import { userRouter } from "./routes/user.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET = process.env.SECRET;
const BASE = "/api/v1";

app.use(bodyParser.json());
app.use(cookieParser(SECRET));
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

dbConnect();

app.use(errorHandler);

app.use(`${BASE}/auth`, authRouter);
app.use(`${BASE}/books`, bookRouter);
app.use(`${BASE}/user`, userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("exit", (err) => {
  console.log(err);
  process.exit(1);
});