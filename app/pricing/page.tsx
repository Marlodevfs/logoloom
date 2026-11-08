'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles, ShieldCheck, ArrowLeft, HelpCircle } from 'lucide-react';
import { PRO_CONFIG } from '@/lib/stripe-pro';

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ returnUrl: window.location.origin }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Checkout error. Please try again.');
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      alert('Unable to initiate checkout');
      setLoading(false);
    }
  };

  const faqs = [
    {
      q: 'Can I use the free version for commercial clients?',
      a: 'Yes, absolutely! The free version is 100% free for unlimited client documents. The only difference is the small, elegant "Made with LogoLoom" footer credit.',
    },
    {
      q: 'How does Pro white-label work?',
      a: 'The Pro plan completely strips away any LogoLoom reference or watermark from all downloaded PDFs. It also unlocks lossless HD vector logo rendering and any custom HEX color.',
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Yes, you can cancel your subscription with a single click at any time. There are no contracts and no cancellation fees.',
    },
    {
      q: 'Do you store my logo or client documents?',
      a: 'Never. LogoLoom is 100% client-side. All PDF rendering and color extraction occur entirely within your browser memory. We maintain zero server copies of your files.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Navigation */}
      <header className="border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Studio</span>
          </Link>

          <Link href="/" className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
            LogoLoom <span className="text-indigo-600 text-xs font-mono font-bold">PRO</span>
          </Link>

          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 sm:py-20 space-y-16">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Simple & Transparent
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            One simple plan for true white-label branding
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Zero friction for everyone. Upgrade to Pro only when you need full white-label documents without external credits.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Tier */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6 shadow-xs">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold">Free Forever</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">For freelancers and coaches getting started.</p>
              </div>

              <div className="flex items-baseline space-x-1">
                <span className="text-4xl font-extrabold">$0</span>
                <span className="text-xs text-slate-400">/ forever</span>
              </div>

              <ul className="space-y-3 text-xs pt-4 border-t border-slate-100 dark:border-slate-800">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>All 3 print-ready templates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Unlimited 300 DPI PDF downloads</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Auto-extract brand color from logo</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Custom booking & portal QR code</span>
                </li>
                <li className="flex items-center space-x-2 text-slate-400">
                  <span>• Discreet LogoLoom footer credit</span>
                </li>
              </ul>
            </div>

            <Link
              href="/"
              className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors block"
            >
              Start Free (No Account)
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-3xl p-8 border-2 border-indigo-600 relative flex flex-col justify-between space-y-6 shadow-xl">
            <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-extrabold text-[10px] tracking-wider uppercase px-3 py-1 rounded-full shadow-md">
              Most Popular
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold">Pro White-Label</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">For boutique agencies and elite consultants.</p>
              </div>

              <div className="flex items-baseline space-x-1">
                <span className="text-4xl font-extrabold">{PRO_CONFIG.priceLabelUsd}</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>

              <ul className="space-y-3 text-xs pt-4 border-t border-slate-200 dark:border-slate-700">
                <li className="flex items-center space-x-2 font-bold text-indigo-600 dark:text-indigo-400">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>100% remove LogoLoom footer & watermark</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Ultra-HD lossless vector rendering</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Unrestricted custom HEX brand colors</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Early access to all upcoming templates</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-75"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'Connecting to Stripe...' : 'Upgrade to Pro White-Label'}</span>
            </button>
          </div>
        </div>

        {/* FAQs */}
        <div className="pt-12 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-500">Everything you need to know about LogoLoom pricing.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1.5 shadow-2xs">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-start space-x-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-400">
        <p>LogoLoom • Designed for craft & speed • 100% In-Browser Privacy</p>
      </footer>
    </div>
  );
}
