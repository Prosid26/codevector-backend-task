-- The pagination order must be backed by matching indexes for both query forms.
DROP INDEX "Product_updatedAt_id_idx";
DROP INDEX "Product_category_updatedAt_id_idx";

CREATE INDEX "Product_createdAt_id_idx"
ON "Product"("createdAt" DESC, "id" DESC);

CREATE INDEX "Product_category_createdAt_id_idx"
ON "Product"("category", "createdAt" DESC, "id" DESC);
