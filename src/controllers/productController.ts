import { NextFunction, Request, Response } from "express";
import { listProducts } from "../services/productService";
import { parseProductsQuery } from "../utils/productQuery";

export async function getProducts(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const query = parseProductsQuery(req.query);
    const result = await listProducts(query);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
