# zhaket-app

`zhaket-app` is a digital marketplace built with Next.js (App Router). It includes product sales, cart and checkout, online payment (Zarinpal), user wallet, secure file downloads, ticketing, user panel, and admin panel.

## Key Features

- Authentication with `next-auth` (password login or OTP login)
- Registration and password recovery via email/SMS OTP
- Shopping cart and order creation
- Online payments with Zarinpal
- Combined payment flow (wallet + payment gateway)
- User wallet (top-up, transactions, balance)
- Admin management for products, categories, tags, menus, files, comments, and tickets
- Secure, time-limited download links with one-time tokens
- Email notifications (Resend) and SMS notifications (MeliPayamak)
- SEO metadata for main and product pages

## Tech Stack

- `Next.js 15` (App Router)
- `React 19`
- `MongoDB + Mongoose`
- `next-auth` (JWT session)
- `Tailwind CSS 4` + `@heroui/react`
- `SWR` (data fetching/caching)
- `Zod` (validation)
- `Resend` (email)
- `MeliPayamak` (SMS)
- `Zarinpal` (payment)

## Project Structure

```text
src/
  app/
    (main)/                 # Public pages
    (auth)/                 # Login/registration
    (user)/panel/           # User panel
    (admin-dashboard)/admin/# Admin panel
    api/                    # API routes
  components/               # UI and feature components
  models/                   # Mongoose models
  lib/
    api/                    # Fetch helpers
    seo/                    # Metadata helper
    utils/                  # db, logger, payment, email/sms, ...
    validations/            # Zod schemas
  contexts/
  hooks/
  stores/
public/
fonts/
secure_uploads/             # Download files (created at runtime)
```

## Prerequisites

- `Node.js` 20+ (recommended)
- `npm` (or another package manager)
- A reachable `MongoDB` instance
- A Zarinpal account (if payment features are enabled)
- A Resend API key (if email features are enabled)
- A MeliPayamak account (if SMS features are enabled)

## Installation and Run

```bash
npm install
npm run dev
```

App runs at:

- `http://localhost:3000`

For production:

```bash
npm run build
npm run start
```

## Environment Variables

Create a `.env.local` file in the project root.

### Full `.env.local` Example

```env
# Core
MONGODB_URI=mongodb://127.0.0.1:27017/zhaket
NEXTAUTH_SECRET=replace_with_a_long_random_secret
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Zarinpal
ZARINPAL_API_BASE_URL=https://sandbox.zarinpal.com/pg/rest/WebGate
ZARINPAL_PAYMENT_MERCHENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
ZARINPAL_PAYMENT_BASE_URL=https://sandbox.zarinpal.com/pg/StartPay/
ZARINPAL_PAYMENT_CALLBACK_URL=http://localhost:3000/api/checkout/verify/zarinpal
ZARINPAL_PAYMENT_WALLET_CALLBACK_URL=http://localhost:3000/api/user/wallet/deposit/verify

# Email
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# SMS (MeliPayamak)
MELIPAYAMAK_USERNAME=your_username
MELIPAYAMAK_PASSWORD=your_password
MELIPAYAMAK_BODY_ID=123456
MELIPAYAMAK_TICKET_BODY_ID=654321
```

### Variables Table

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `NEXTAUTH_SECRET` | Yes | JWT signing secret used by `next-auth` |
| `NEXT_PUBLIC_API_BASE_URL` | Yes | Base URL for frontend API calls |
| `NEXT_PUBLIC_BASE_URL` | Yes | Base URL for redirects and links in emails |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Orders link in order-completion email |
| `ZARINPAL_API_BASE_URL` | Feature-dependent (payments) | Create/verify Zarinpal payments |
| `ZARINPAL_PAYMENT_MERCHENT_ID` | Feature-dependent (payments) | Zarinpal merchant ID |
| `ZARINPAL_PAYMENT_BASE_URL` | Feature-dependent (payments) | Zarinpal redirect URL base |
| `ZARINPAL_PAYMENT_CALLBACK_URL` | Feature-dependent (payments) | Cart checkout callback URL |
| `ZARINPAL_PAYMENT_WALLET_CALLBACK_URL` | Feature-dependent (wallet top-up) | Wallet top-up callback URL |
| `RESEND_API_KEY` | Feature-dependent (email) | Email OTP and email notifications |
| `MELIPAYAMAK_USERNAME` | Feature-dependent (SMS) | SMS provider credentials |
| `MELIPAYAMAK_PASSWORD` | Feature-dependent (SMS) | SMS provider credentials |
| `MELIPAYAMAK_BODY_ID` | Feature-dependent (SMS OTP) | OTP SMS template ID |
| `MELIPAYAMAK_TICKET_BODY_ID` | Feature-dependent (ticket SMS) | Ticket-status SMS template ID |

Important:

- The code uses `ZARINPAL_PAYMENT_MERCHENT_ID` with this exact spelling. Your `.env.local` must use the same key name.

## Scripts

- `npm run dev` start development server
- `npm run build` build for production
- `npm run start` start production server
- `npm run lint` run ESLint

## Main Frontend Routes

- `/` home page
- `/login` login/register
- `/category/[slug]` category listing
- `/category/[slug]/[product-slug]` product page
- `/cart` shopping cart
- `/payment?status=success|failed` payment result page
- `/panel/*` user panel (tickets, wallet, invoices, downloads)
- `/admin/*` admin panel

## API Overview

- `GET/POST/DELETE /api/cart`
- `POST /api/checkout`
- `GET /api/checkout/verify/zarinpal`
- `GET /api/download`
- `POST /api/user/generate-download-link`
- `GET /api/user/invoices`
- `GET /api/user/invoices/[id]`
- `GET /api/user/order`
- `GET /api/user/wallet`
- `POST /api/user/wallet/deposit`
- `GET /api/user/wallet/deposit/verify`
- `GET /api/user/transactions`
- `GET/POST /api/user/ticket`
- `GET /api/user/ticket/[id]`
- `POST /api/user/ticket/[id]/reply`
- `POST /api/auth/send-otp`
- `POST /api/auth/register`
- `POST /api/auth/send-reset-otp`
- `POST /api/auth/verify-reset-otp`
- `POST /api/auth/reset-password`
- `POST /api/auth/user-exists`
- `GET/POST /api/auth/[...nextauth]`
- `GET/POST/PUT/DELETE /api/admin/*` for users, products, categories, tags, menus, files, tickets, comments, settings, and dashboard

## Core System Flows

### 1) Authentication

- Password login (`credentials-password`)
- OTP login (`credentials-otp`)
- JWT-based session strategy
- `/panel` and `/admin` are protected by middleware

### 2) Purchase and Payment

- User checks out from cart
- If wallet is enabled, part of the amount is paid from wallet balance
- Remaining amount is redirected to Zarinpal
- Callback updates order and transaction states

### 3) Secure Downloads

- After successful purchase, a random token-based download link is generated
- Download token is valid for 1 hour
- Files are served from `secure_uploads`

### 4) Ticketing System

- User can create tickets and send replies
- Admin can manage ticket status and replies
- Notifications are sent by email and, in some cases, SMS

## File Storage

- Media images are stored in `public/uploads`
- Product files are stored in `secure_uploads`
- `secure_uploads` is ignored in `.gitignore`
- Server runtime user must have write access to these paths

## Bootstrapping the First Admin

If there is no initial admin, create a user and update the role to `admin` in MongoDB:

```js
// Mongo Shell
use zhaket

db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## Production Deployment Notes

- Set all required environment variables on the server
- Use HTTPS URLs for `NEXT_PUBLIC_BASE_URL` and Zarinpal callbacks
- Ensure write access for `secure_uploads` and `public/uploads`
- Enable server-side error logging and monitoring

## Quick Troubleshooting

- MongoDB connection errors: verify `MONGODB_URI`
- `NEXTAUTH_SECRET` errors: verify it is set and strong enough
- Zarinpal callback errors: verify callback URLs and domain setup
- Email errors: verify `RESEND_API_KEY`
- SMS errors: verify `MELIPAYAMAK_*` values and template IDs