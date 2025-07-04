import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import notFound from "./app/middleware/not-found";
import globalErrorHandler from "./app/middleware/globalErrorhandler";
import router from "./app/routes/routes";

const app: Application = express();
app.set('trust proxy', 1);
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://join-up-five.vercel.app"],
    credentials: true,
  })
);

app.use("/api/v1", router);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
