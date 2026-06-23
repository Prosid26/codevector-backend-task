import { BadRequestError } from "./appError";

export interface ProductCursor {
  createdAt: Date;
  id: string;
}

export function createProductCursor(createdAt: Date, id: string): string {
  return `${createdAt.toISOString()}_${id}`;
}

export function parseProductCursor(value: string): ProductCursor {
  const separatorIndex = value.lastIndexOf("_");

  if (separatorIndex === -1) {
    throw new BadRequestError("Invalid cursor");
  }

  const createdAtValue = value.slice(0, separatorIndex);
  const id = value.slice(separatorIndex + 1);
  const createdAt = new Date(createdAtValue);

  if (
    id.length === 0 ||
    Number.isNaN(createdAt.getTime()) ||
    createdAt.toISOString() !== createdAtValue
  ) {
    throw new BadRequestError("Invalid cursor");
  }

  return { createdAt, id };
}
