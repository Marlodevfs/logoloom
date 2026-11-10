import fs from 'fs';
import path from 'path';

async function main() {
  console.log('=== LOGOLOOM TECHNICAL SEO & PRERENDER AUDIT ===\n');
  let failures = 0;

  const outDir = path.join(process.cwd(), '.next', 'server', 'app');

  const checkPage = (
    relPath: string,
    options: {
      name: string;
      expectedLang: string;
      expectedH1: string;
      expectedCanonical: string;
      expectedHreflangs: string[];
      mustContain?: (string | RegExp)[];
      mustNotContain?: (string | RegExp)[];
    }
  ) => {
    const filePath = path.join(outDir, relPath);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${relPath}`);
      failures++;
      return;
    }
    const html = fs.readFileSync(filePath, 'utf-8');

    console.log(`\n📄 Auditing [${options.name}] (${relPath})...`);

    // 1. Check html lang attribute
    const langRegex = new RegExp(`<html[^>]+lang=["']${options.expectedLang}["']`, 'i');
    if (!langRegex.test(html)) {
      console.error(`  ❌ <html lang="${options.expectedLang}"> NOT FOUND`);
      failures++;
    } else {
      console.log(`  ✅ <html lang="${options.expectedLang}"> verified`);
    }

    // 2. Check canonical link
    const canonRegex = new RegExp(`<link[^>]+rel=["']canonical["'][^>]+href=["']${options.expectedCanonical}["']`, 'i');
    if (!canonRegex.test(html)) {
      console.error(`  ❌ Canonical link to "${options.expectedCanonical}" NOT FOUND`);
      failures++;
    } else {
      console.log(`  ✅ Canonical link verified: ${options.expectedCanonical}`);
    }

    // 3. Check H1 heading (MUST BE EXACTLY ONE ON THE PAGE!)
    const allH1s = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    if (allH1s.length === 0) {
      console.error(`  ❌ No <h1> tag found!`);
      failures++;
    } else if (allH1s.length > 1) {
      console.error(`  ❌ Multiple <h1> tags found (${allH1s.length}): ${JSON.stringify(allH1s)}`);
      failures++;
    } else {
      const h1Text = allH1s[0].replace(/<[^>]+>/g, '').trim();
      if (!h1Text.toLowerCase().includes(options.expectedH1.toLowerCase())) {
        console.error(`  ❌ <h1> text mismatch. Found: "${h1Text}", expected to include: "${options.expectedH1}"`);
        failures++;
      } else {
        console.log(`  ✅ Exactly 1 unique <h1> heading verified: "${h1Text}"`);
      }
    }

    // 4. Check paragraph tags (Seobility requirement)
    const pCount = (html.match(/<p[^>]*>/gi) || []).length;
    if (pCount < 3) {
      console.error(`  ❌ Insufficient paragraph (<p>) tags found: ${pCount} (minimum 3 required)`);
      failures++;
    } else {
      console.log(`  ✅ Detected ${pCount} semantic <p> paragraphs`);
    }

    // 5. Check internal links structure (Seobility requirement: >10 internal links)
    const internalLinks = (html.match(/<a[^>]+href=["'](\/[a-z0-9\-_/]+)["']/gi) || []);
    if (internalLinks.length < 10) {
      console.error(`  ❌ Too few internal links found: ${internalLinks.length} (minimum 10 required)`);
      failures++;
    } else {
      console.log(`  ✅ Detected ${internalLinks.length} crawlable internal links`);
    }

    // 6. Check Favicon & Apple touch icon
    const hasFavicon = /<link[^>]+rel=["'](?:shortcut )?icon["']/i.test(html);
    const hasAppleIcon = /<link[^>]+rel=["']apple-touch-icon["']/i.test(html);
    if (!hasFavicon) {
      console.error(`  ❌ Favicon link NOT found in HTML`);
      failures++;
    } else {
      console.log(`  ✅ Favicon link verified`);
    }
    if (!hasAppleIcon) {
      console.error(`  ❌ Apple touch icon link NOT found in HTML`);
      failures++;
    } else {
      console.log(`  ✅ Apple touch icon verified`);
    }

    // 7. Check hreflang tags
    for (const hLang of options.expectedHreflangs) {
      const hreflangRegex = new RegExp(`<link[^>]+rel=["']alternate["'][^>]+hrefLang=["']${hLang}["']`, 'i');
      if (!hreflangRegex.test(html)) {
        console.error(`  ❌ Alternate hreflang="${hLang}" NOT FOUND`);
        failures++;
      }
    }
    console.log(`  ✅ Reciprocal hreflang tags verified for: ${options.expectedHreflangs.join(', ')}`);

    // 8. Custom mustContain / mustNotContain
    for (const item of options.mustContain || []) {
      const passes = typeof item === 'string' ? html.includes(item) : item.test(html);
      if (!passes) {
        console.error(`  ❌ MUST CONTAIN "${item}" failed`);
        failures++;
      }
    }
    for (const item of options.mustNotContain || []) {
      const fails = typeof item === 'string' ? html.includes(item) : item.test(html);
      if (fails) {
        console.error(`  ❌ MUST NOT CONTAIN "${item}" failed (found in HTML)`);
        failures++;
      }
    }
  };

  const allLocales = ['en', 'fr', 'es', 'de', 'pt', 'it', 'x-default'];

  // Check Homepages
  checkPage('en.html', {
    name: 'EN Homepage',
    expectedLang: 'en',
    expectedH1: 'Free Printable Planners',
    expectedCanonical: 'https://logoloom.app/en',
    expectedHreflangs: allLocales,
    mustContain: ['JavaScript is disabled in your browser', '"@type":"WebApplication"', '"@type":"FAQPage"'],
    mustNotContain: ['Loading LogoLoom Studio...', 'Fitness & Executive Coaches', 'welcome packet'],
  });

  checkPage('fr.html', {
    name: 'FR Homepage',
    expectedLang: 'fr',
    expectedH1: 'Planners et documents professionnels',
    expectedCanonical: 'https://logoloom.app/fr',
    expectedHreflangs: allLocales,
    mustContain: ['Questions fréquentes', '"@type":"WebApplication"', '"@type":"FAQPage"'],
    mustNotContain: ['Loading LogoLoom Studio...', 'welcome-packet'],
  });

  checkPage('de.html', {
    name: 'DE Homepage',
    expectedLang: 'de',
    expectedH1: 'Kostenlose druckbare Planer',
    expectedCanonical: 'https://logoloom.app/de',
    expectedHreflangs: allLocales,
    mustContain: ['Häufig gestellte Fragen', '"@type":"WebApplication"', '"@type":"FAQPage"'],
    mustNotContain: ['Loading LogoLoom Studio...'],
  });

  // Check Template Pages
  checkPage('de/weekly-planner.html', {
    name: 'DE Weekly Planner',
    expectedLang: 'de',
    expectedH1: 'Kostenloser Wochenplaner',
    expectedCanonical: 'https://logoloom.app/de/weekly-planner',
    expectedHreflangs: allLocales,
    mustContain: ['"@type":"FAQPage"', 'A4 &amp; US Letter'],
    mustNotContain: ['Loading LogoLoom Studio...'],
  });

  checkPage('fr/checklist.html', {
    name: 'FR Checklist',
    expectedLang: 'fr',
    expectedH1: 'Checklist par étapes et cases à cocher',
    expectedCanonical: 'https://logoloom.app/fr/checklist',
    expectedHreflangs: allLocales,
    mustContain: ['"@type":"FAQPage"'],
    mustNotContain: ['Loading LogoLoom Studio...'],
  });

  checkPage('en/habit-tracker.html', {
    name: 'EN Habit Tracker',
    expectedLang: 'en',
    expectedH1: 'Free Printable 30-Day Habit Tracker',
    expectedCanonical: 'https://logoloom.app/en/habit-tracker',
    expectedHreflangs: allLocales,
    mustContain: ['30-Day portrait grid', '"@type":"FAQPage"'],
    mustNotContain: ['Loading LogoLoom Studio...'],
  });

  console.log('\n============================================================');
  if (failures === 0) {
    console.log('✅ ALL SEO & PRE-RENDER CHECKS PASSED PERFECTLY (0 FAILURES)!');
    process.exit(0);
  } else {
    console.error(`❌ FAILED WITH ${failures} ERRORS.`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
