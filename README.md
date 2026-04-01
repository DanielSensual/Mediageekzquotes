# MediaGeekz Quotes

Multi-tenant video production proposal and invoicing platform. Built with Next.js 16, Prisma, and Square Payments.

**Production:** [mediageekz-quotes.vercel.app](https://mediageekz-quotes.vercel.app)

---

## Active Proposals

| Client | Route | Status |
|--------|-------|--------|
| ThreadLink | `/thread` | Active |
| Easy Denture | `/proposals/easy-denture` | Active |
| Eventive | `/proposals/eventive` | Active |
| Leadership Interviews | `/proposals/leadership-interviews` | Active |
| Veronica Ellyn | `/proposals/veronica-ellyn` | Active |
| Convention Event | `/proposals/convention-event` | Active |
| Wedding Basic | `/proposals/wedding-basic` | Active |
| Andy The Coach | `/proposals/andy-the-coach` | Active |
| Alta Vida Pool Party | `/altavidaevent` | Active |

## Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** Supabase (Postgres) via Prisma
- **Payments:** Square (Web Payments SDK + Checkout API)
- **Email:** Resend
- **Deployment:** Vercel

## Setup

```bash
# Install dependencies
npm install

# Copy env vars
cp .env.example .env.local
# Fill in your credentials

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Run dev server
npm run dev
```

## Environment Variables

See `.env.example` for the full list. Key groups:

- **Database** — Supabase connection strings
- **Square (MediaGeekz)** — Primary payment processing
- **Square (Alta Vida)** — Separate client account
- **Resend** — Email notifications
- **Stripe** — Multi-tenant checkout (legacy)
- **JWT_SECRET** — Admin authentication

## Project Structure

```
app/
├── proposals/          # Client proposal pages (9 active)
├── altavidaevent/      # Alta Vida event invoice
├── checkout/           # Square Web Payments checkout
├── admin/              # Admin dashboard + ADTV invoicing
├── api/                # API routes (Square, Stripe, Resend)
├── [tenant]/           # Multi-tenant quote engine
├── sales/              # Sales presentation page
└── thread/             # ThreadLink proposal
lib/
├── engine.js           # Quote calculation engine
├── verticals/          # 12 industry vertical configs
├── prisma.js           # Prisma client singleton
└── pdf-generator.js    # PDF invoice generation
```
