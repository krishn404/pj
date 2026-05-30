# Supabase setup for this project

Project ref: **txaqzyddienpsiytkzwe**

## 1. Create `.env.local`

Copy the example file and fill in secrets (never commit `.env.local`):

```bash
cp .env.example .env.local
```

Edit `.env.local`:

| Variable | Where to find it |
|----------|------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Settings → API → `anon` `public` key |
| `DATABASE_URL` | Settings → Database → Connection string |

## 2. Database URL — IPv4 vs direct

Supabase shows **“Not IPv4 compatible”** on the direct host `db.txaqzyddienpsiytkzwe.supabase.co`.

- **On IPv4-only networks (common on Windows):** use **Session pooler** URI from the dashboard.
- **If you have IPv6:** the direct URI is fine:

```
postgresql://postgres:[PASSWORD]@db.txaqzyddienpsiytkzwe.supabase.co:5432/postgres
```

**Session pooler** (replace `[PASSWORD]` and `[REGION]` from the dashboard copy button):

```
postgresql://postgres.txaqzyddienpsiytkzwe:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
```

Use the exact string from **Connect → Session pooler → URI** so region and user are correct.

## 3. Push schema and seed content

```bash
npm run db:push
npm run db:seed
```

## 4. Admin access

Go to `/admin/login` — you'll see **GO AWAY**. Enter **↑ ↑ ↓ ↓** (arrow keys) to unlock the dashboard. No email/password.

Optional: set `ADMIN_SESSION_SECRET` in `.env.local` for a signed session cookie.

## 5. Run the app

```bash
npm run dev
```

- Portfolio: http://localhost:3000  
- Admin: http://localhost:3000/admin  

After seeding, the site reads from Postgres instead of the legacy fallback.

## Optional: Supabase Agent Skills

For Cursor/AI tooling (not required for the app):

```bash
npx skills add supabase/agent-skills
```
