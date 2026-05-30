# CMS architecture (Phase 0–1)

## Implementation checklist

- [x] Drizzle schema for all entities
- [x] Zod validation for media URLs
- [x] Seed from `lib/content.ts` + `lib/cms/seed/legacy-projects.ts`
- [x] `getPortfolio()` with cache tag `portfolio`
- [x] Frontend sections accept typed props (no `lib/content` in components)
- [x] YouTube / Instagram parsers + `MediaRenderer`
- [x] Admin shell: arrow-key gate, dark UI, sidebar, dashboard
- [x] Full CRUD for all sections
- [x] Drag-and-drop reorder (dnd-kit)
- [x] Supabase Storage image uploads (`portfolio` bucket)
- [x] YouTube / Instagram URL fields with live preview
- [x] Testimonials public section (hidden when empty)

## Dependencies

| Package | Purpose |
|---------|---------|
| `drizzle-orm` | ORM |
| `drizzle-kit` | Migrations / push |
| `postgres` | Postgres driver |
| `@supabase/supabase-js` | Auth + Storage client |
| `@supabase/ssr` | Cookie session in App Router |
| `tsx` | Run seed script |
| `dotenv` | CLI env loading |

## Folder structure

```
lib/cms/
  db/schema.ts       # Drizzle tables
  db/index.ts        # DB client
  types/             # PortfolioDTO (UI-facing)
  validation/        # Zod
  mappers/           # DB → DTO
  queries/           # getPortfolio, fetch
  seed/              # run-seed.ts
  fallback/          # Legacy mapper when no DB
lib/media/           # URL parsers
components/media/    # Embeds
app/(public)/        # Portfolio (Lenis)
app/admin/           # CMS (no Lenis)
```

## Database setup

1. Create a Supabase project.
2. Copy `.env.example` → `.env.local` and fill values.
3. Run `npm run db:push` to create tables.
4. Run `npm run db:seed` to import existing content.
5. Create an admin user in Supabase Auth (email/password).

## Revalidation

After admin mutations (Phase 2), call `revalidatePortfolio()` from `lib/cms/revalidate.ts`.

## DTO flow

```
PostgreSQL → fetchPortfolioFromDatabase() → buildPortfolioDTO() → getPortfolio() → RSC props
```

Fallback (no `DATABASE_URL`): `getLegacyPortfolioFallback()` → same DTO shape.
