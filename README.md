# LogoLoom (logoloom.app)

> Turn generic documents into branded, print-ready PDFs in under two minutes.

**LogoLoom** is a privacy-first web tool designed for independent coaches, consultants, and freelancers. Drag & drop your logo, watch your brand color auto-extract with WCAG contrast verification, preview changes live, and download a ready-to-print 300 DPI PDF with zero friction: no account, no signup, and no paywall.

---

## ✨ Features

- **Zero Friction**: 100% free core experience. No signup, no login, no paywall to create and download unlimited PDFs.
- **Privacy by Design**: All logo uploads, color extractions, and PDF compilations execute 100% in your browser. Nothing is ever uploaded to a server.
- **Auto Color Extraction & WCAG Contrast**: Detects dominant brand hues from SVG, PNG, and JPG files and automatically checks or optimizes contrast against white paper (minimum 4.5:1 ratio).
- **3 Handcrafted Print-Ready Templates** (A4 & US Letter):
  1. **30-Day Habit & Momentum Tracker**: Category grid with weekly milestone checkpoints (Day 7, 14, 21, 30) and coach reflection notes.
  2. **90-Day Strategic Roadmap**: 30-60-90 day milestone phases with deliverables, KPI targets, and bilateral sign-off blocks.
  3. **Client Welcome Packet**: Onboarding guide with communication SLAs, core working agreements, and 72-hour kickoff checklist.
- **Vector QR Code Engine**: Embeds custom booking links (e.g. Calendly, client portal) with high error correction and quiet zones.
- **Multilingual Support (6 Languages)**: English, French, Spanish, German, Portuguese, and Italian with independent language selection for UI and Document content.
- **Pro White-Label**: An isolated Stripe Checkout subscription module ($9/mo) that removes the LogoLoom watermark and enables ultra-HD lossless vector rendering.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+ (tested on Node v20/v22/v26)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repository-url>
cd logoloom

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Building & Testing

```bash
# Build for production
npm run build

# Start production server
npm run start

# Run end-to-end browser verification tests
node scripts/test-phase1.mjs
node scripts/test-phase2.mjs
node scripts/test-phase3.mjs
```

---

## 🌐 Deployment to Vercel

LogoLoom is fully optimized for zero-configuration deployment on **Vercel**:

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your LogoLoom repository.
4. Set the environment variables from `.env.example` (optional, needed only if enabling live Stripe Pro checkout):
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PRICE_ID_MONTHLY`
   - `NEXT_PUBLIC_APP_URL`
5. Click **Deploy**.

---

## 🛡️ Architecture & Security

- **Client-Side Rendering**: Powered by Next.js 15, Tailwind CSS, `html-to-image`, and `jspdf`.
- **Zero Server Uploads**: The user's logo file and client names remain strictly in browser RAM.
- **Local Persistence**: User preferences and active brand kit are synchronized to `localStorage`.
- **Stripe Isolation**: Pro checkout is isolated behind serverless route handlers (`/api/checkout`) with fallback simulated activation in development.

---

## 📄 License

MIT License. Designed with craft, clarity, and speed.
