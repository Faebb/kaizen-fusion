# Kaizen Fusion — Frontend

React 19 + Vite 8 + TanStack Router/Query + Zustand + Tailwind v4 frontend
for the Kaizen Fusion restaurant SaaS. Talks to the
[`api-restaurant`](../api-restaurant/) backend.

The app has two faces, both wearing the same dark theme (primary
`#c10b2d`, gold accent `#D4AF37`, Space Grotesk):

- **Public customer flow** — a guest reaches a restaurant by its slug
  (`/menu`, `/cart`, `/checkout`, `/order-confirmation`), goes through the
  reservation + checkout flow and creates an order against the API.
- **Admin dashboard** (`/dashboard/*`) — restaurant owners log in or
  register, then manage their menu, orders, reservations and tables.

---

## Quickstart

```bash
cd kaizen-fusion
cp .env.example .env
# Edit .env so VITE_API_KAIZEN points to the backend (e.g. http://localhost:3000)

npm install
npm run dev      # http://localhost:5173
```

In a separate terminal, start the backend (`cd ../api-restaurant && npm run
dev`). The backend's `ALLOWED_ORIGINS` must include the frontend dev origin
(`http://localhost:5173`, which is the default in `.env.example`).

Use the seeded demo account to enter the dashboard:

- Email: `owner@kaizenfusion.com`
- Password: `Owner123!`

Or register a new restaurant from `/register`.

---

## Routing

| Path | Description |
|------|-------------|
| `/` | Reservation step (entry of the customer flow) |
| `/menu`, `/menu/:id` | Menu listing and item detail |
| `/cart` | Cart |
| `/checkout` | Checkout form (customer + payment + tip) |
| `/confirmation` | After table assignment |
| `/order-confirmation` | After order creation |
| `/login` | Owner login |
| `/register` | Owner / restaurant registration |
| `/dashboard` | Admin overview (JWT-protected) |
| `/dashboard/menu` | Categories + items CRUD |
| `/dashboard/orders` | Orders list + status transitions |
| `/dashboard/reservations` | Reservation list |
| `/dashboard/tables` | Tables CRUD + ocupada/libre toggle |

Dashboard routes redirect to `/login` when no JWT is present.

---

## Architecture

```
src/
├── app/
│   ├── providers/        # QueryClient + TanStack Router
│   └── router/           # routes (one file per route + nested dashboard children)
├── features/
│   ├── auth/             # zod schemas, Zustand store (persisted),
│   │                     # auth-service, useLogin/useRegisterMutation,
│   │                     # LoginView / RegisterView
│   ├── admin/            # admin services + react-query hooks +
│   │                     # DashboardLayout + per-area views
│   ├── menu/             # public menu (services / query / view / components)
│   ├── reservation/      # public reservation
│   ├── confirmation/     # reservation confirmation
│   ├── payment/          # checkout schema, form, sections, order service
│   ├── cart/             # zustand cart store + view + summary
│   └── pages/            # thin route wrappers that mount the views
├── shared/               # Button, Input, Select, FloatingCart, MainLayout,
│                         # query-key catalogue, query-client
├── services/http/        # axios client + JWT request interceptor + 401 reset
├── lib/                  # utils, toasts, formatters, useCurrentSlug
└── main.tsx              # root entry
```

The single axios client lives in `src/services/http/client.ts`. It attaches
the JWT from the auth store on every request and, on a 401 response, clears
the auth state so the UI re-routes to `/login` on the next protected
navigation.

---

## Multi-tenancy from the frontend

- **Public flow** services hit `/api/public/:slug/*`. The slug currently
  comes from `useCurrentSlug()` (returns `DEFAULT_PUBLIC_SLUG = "kaizen-fusion"`).
  This indirection is the single seam to swap in a route-param-based slug
  (`/r/$slug/menu`) without touching the services.
- **Admin** flow hits `/api/admin/*` and never carries a slug in the URL —
  the JWT already carries the `tenantId`.

---

## Environment

```env
# .env (gitignored)
VITE_API_KAIZEN=http://localhost:3000
```

`.env.example` is committed as the template. `.env` and `.env.*` (except
`.env.example`) are ignored.

---

## Scripts

```bash
npm run dev       # vite dev server
npm run build     # tsc -b && vite build
npm run preview   # serve the built bundle
npm run lint      # eslint
```
