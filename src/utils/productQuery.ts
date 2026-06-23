import { Request } from "express";
import { BadRequestError } from "./appError";
import { parseProductCursor, ProductCursor } from "./productCursor";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export interface ProductsQuery {
  limit: number;
  category?: string;
  cursor?: ProductCursor;
}

export function parseProductsQuery(query: Request["query"]): ProductsQuery {
  const limitValue = getSingleValue(query.limit, "limit");
  const categoryValue = getSingleValue(query.category, "category");
  const cursorValue = getSingleValue(query.cursor, "cursor");

  const limit = parseLimit(limitValue);
  const category = categoryValue || undefined;
  const cursor = cursorValue
    ? parseProductCursor(cursorValue)
    : undefined;

  return { limit, category, cursor };
}

function getSingleValue(value: unknown, name: string): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "string") {
    throw new BadRequestError(`${name} must be a single string value`);
  }

  return value;
}

function parseLimit(value: string | undefined): number {
  if (value === undefined || value === "") {
    return DEFAULT_LIMIT;
  }

  if (!/^\d+$/.test(value)) {
    throw new BadRequestError("limit must be a positive integer");
  }

  const limit = Number(value);

  if (limit < 1 || limit > MAX_LIMIT) {
    throw new BadRequestError(
      `limit must be between 1 and ${MAX_LIMIT}`,
    );
  }

  return limit;
}
