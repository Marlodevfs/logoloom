# LogoLoom (logoloom.app)

> Turn generic documents into branded, print-ready vector PDFs in under two minutes.

**LogoLoom** is a privacy-first web tool designed for independent coaches, consultants, and freelancers. Drag & drop your logo, watch your brand color auto-extract with WCAG contrast verification, preview changes live, and download a ready-to-print vector PDF with zero friction: no account, no signup, and no paywall.

---

## ✨ Features

- **Zero Friction**: 100% free core experience. No signup, no login, no paywall to create and download unlimited PDFs.
- **Privacy by Design**: All logo uploads, color extractions, and PDF compilations execute 100% in your browser. Nothing is ever uploaded to a server.
- **True Vector PDF Generation**: Powered by `@react-pdf/renderer` with selectable text, embedded Unicode fonts, and pure vector SVG QR codes. Super sharp at any zoom level, typically 50–70 KB (far under 1 MB).
- **Auto Color Extraction & WCAG Contrast**: Detects dominant brand hues from SVG, PNG, and JPG files and automatically checks or optimizes contrast against white paper (minimum 4.5:1 ratio).
- **3 Handcrafted Print-Ready Templates** (A4 & US Letter):
  1. **30-Day Habit & Momentum Tracker**: Category grid with weekly milestone checkpoints (Day 7, 14, 21, 30) and coach reflection notes.
  2. **90-Day Strategic Roadmap**: 30-60-90 day milestone phases with deliverables, KPI targets, and bilateral sign-off blocks.
  3. **Client Welcome Packet**: Onboarding guide with communication SLAs, core working agreements, and 72-hour kickoff checklist.
- **Vector QR Code Engine**: Embeds custom booking links (e.g. Calendly, client portal) with high error correction and quiet zones.
- **Multilingual Support (6 Languages)**: English, French, Spanish, German, Portuguese, and Italian with independent language selection for UI and Document content, locale-prefixed routes (`/en`, `/fr`, etc.), and complete `hreflang` tags.
- **Pro White-Label Security**: Optional Stripe Checkout subscription ($9/mo) with server-side HMAC token verification that removes the LogoLoom watermark. Free flow remains 100% account-free.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 20 LTS or higher
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Marlodevfs/logoloom.git
cd logoloom

# Install dependencies
npm install

# Setup environment variables (optional for local dev)
cp .env.example .env

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Building & Testing

```bash
# Type-check TypeScript
npm run typecheck

# Build for production (SSG + SSR)
npm run build

# Start production server
npm run start

# Run comprehensive automated test suite (Vector PDF, QR, Translations)
npm test
```

---

## 🌐 Deployment to Vercel

LogoLoom is fully optimized for deployment on **Vercel**:

1. Push your repository to GitHub (`https://github.com/Marlodevfs/logoloom`).
2. Go to [Vercel](https://vercel.com) and import your repository.
3. Configure your custom domain in **Project Settings > Domains**:
   - Set `logoloom.app` as the **Primary Domain**.
   - Set `www.logoloom.app` to **Redirect to logoloom.app** (308/301).
4. Set optional environment variables:
   - `STRIPE_SECRET_KEY`: Your live Stripe secret key (`sk_live_...`).
   - `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook signing secret (`whsec_...`).
   - `STRIPE_PRICE_ID_MONTHLY`: Price ID for Pro ($9/mo).
   - `NEXT_PUBLIC_APP_URL`: `https://logoloom.app`
5. Click **Deploy**.

---

## 🛡️ Architecture & Security

- **Server-Side Rendering & SSG**: Pre-rendered landing page copy, JSON-LD (`WebApplication` and `FAQPage`), and dynamic 1200x630 OpenGraph cards.
- **Pure Vector PDF Engine**: Client-side compiled vector documents using `@react-pdf/renderer` with embedded Roboto fonts.
- **Zero Server Uploads**: Logos and client information never leave client memory.
- **HMAC Cryptographic Subscription Verification**: Server-side verification for Pro status without forcing free users to create accounts.

---

## 📄 License

MIT License. Designed with craft, clarity, and speed.
