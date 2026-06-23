import cors from "cors";
import express from "express";
import productRoutes from "./routes/productRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFoundHandler";

const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CodeVector Backend API is running 🚀",
    endpoints: {
      products: "/products",
      productsWithLimit: "/products?limit=20",
      productsByCategory: "/products?category=Electronics",
      nextPage: "/products?cursor=<nextCursor>",
    },
  });
});

// Product routes
app.use("/products", productRoutes);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

export default app;