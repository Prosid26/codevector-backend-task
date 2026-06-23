import type { Prisma, Product } from "@prisma/client";
import prisma from "../prisma";
import { createProductCursor } from "../utils/productCursor";
import { ProductsQuery } from "../utils/productQuery";

export interface ProductsPage {
  products: Product[];
  nextCursor: string | null;
}

export async function listProducts(query: ProductsQuery): Promise<ProductsPage> {
  const where: Prisma.ProductWhereInput = {};

  if (query.category) {
    where.category = query.category;
  }

  if (query.cursor) {
    where.OR = [
      {
        createdAt: {
          lt: query.cursor.createdAt,
        },
      },
      {
        createdAt: query.cursor.createdAt,
        id: {
          lt: query.cursor.id,
        },
      },
    ];
  }

  // One extra row tells us whether another page exists without a count query.
  const products = await prisma.product.findMany({
    where,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: query.limit + 1,
  });

  const hasNextPage = products.length > query.limit;
  const page = hasNextPage ? products.slice(0, query.limit) : products;
  const lastProduct = page.at(-1);

  return {
    products: page,
    nextCursor:
      hasNextPage && lastProduct
        ? createProductCursor(lastProduct.createdAt, lastProduct.id)
        : null,
  };
}
