import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import notFound from "./app/middleware/not-found";
import globalErrorHandler from "./app/middleware/globalErrorhandler";
import router from "./app/routes/routes";

const app: Application = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
