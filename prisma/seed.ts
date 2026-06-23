import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const categories = [
  "Electronics",
  "Fashion",
  "Books",
  "Sports",
  "Beauty",
  "Home",
  "Toys",
  "Furniture",
];

async function main() {
  console.log("🗑️ Deleting existing products...");
  await prisma.product.deleteMany();

  const TOTAL_PRODUCTS = 200000;
  const BATCH_SIZE = 5000;

  console.log(`🚀 Seeding ${TOTAL_PRODUCTS} products...`);

  for (let i = 0; i < TOTAL_PRODUCTS; i += BATCH_SIZE) {
    const products = Array.from({ length: BATCH_SIZE }, () => ({
      name: faker.commerce.productName(),
      category: faker.helpers.arrayElement(categories),
      price: Number(faker.commerce.price()),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }));

    await prisma.product.createMany({
      data: products,
    });

    console.log(`✅ Inserted ${Math.min(i + BATCH_SIZE, TOTAL_PRODUCTS)} products`);
  }

  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });