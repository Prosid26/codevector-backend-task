import cors from "cors";
import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFoundHandler";
import productRoutes from "./routes/productRoutes";

const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
