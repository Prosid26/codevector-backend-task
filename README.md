# Codevector Backend Task

Simple Express + Prisma backend for paginated product listings with cursor-based pagination.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and update the connection string.
   ```bash
   cp .env.example .env
   ```

3. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run build` — compile TypeScript to `dist/`
- `npm run dev` — start development server with hot reload
- `npm run start` — run compiled application
- `npm run typecheck` — run TypeScript type checking
- `npm run prisma:generate` — generate Prisma client
- `npm run prisma:migrate` — apply database migrations
- `npm run seed` — populate database with sample products

## API

### GET /products

Query parameters:

- `limit` — number of products per page (default `20`, max `100`)
- `category` — optional category filter
- `cursor` — optional pagination cursor returned from previous response

Response:

```json
{
  "products": [ ... ],
  "nextCursor": "2024-01-01T00:00:00.000Z_..." | null
}
```
