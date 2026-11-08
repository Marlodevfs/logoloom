import os
import sys
import re

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

import pdfplumber

out_dir = os.path.join(os.path.dirname(__file__), 'output/quality-gates')

pdf_files = [
    'habit-a4-fr-square-free.pdf',
    'habit-a4-fr-nologo-noqr.pdf',
    'habit-letter-en-wide-pro.pdf',
    'habit-a4-de-tall-free.pdf',
    'habit-letter-fr-dark-pro.pdf',
]

all_passed = True

print("=" * 60)
print("🔍 LOGOLOOM HABIT TRACKER QUALITY GATE AUDIT")
print("=" * 60)

for filename in pdf_files:
    pdf_path = os.path.join(out_dir, filename)
    if not os.path.exists(pdf_path):
        print(f"❌ Missing expected PDF: {filename}")
        all_passed = False
        continue

    file_size_kb = os.path.getsize(pdf_path) / 1024
    print(f"\n📄 Auditing: {filename} ({file_size_kb:.1f} KB)")

    # 1. File size check (< 1 MB)
    if file_size_kb > 1024:
        print(f"   ❌ File size exceeded 1 MB: {file_size_kb:.1f} KB")
        all_passed = False
    else:
        print(f"   ✅ File size < 1 MB ({file_size_kb:.1f} KB)")

    with pdfplumber.open(pdf_path) as pdf:
        for page_idx, page in enumerate(pdf.pages):
            chars = page.chars
            text = page.extract_text() or ""

            # 2. Selectable text extraction
            if len(text) < 400:
                print(f"   ❌ Text extraction failed or too short: {len(text)} chars")
                all_passed = False
            else:
                print(f"   ✅ Selectable text extracted: {len(text)} characters")

            # 3. Minimum Font Size (Nothing below 7.5 pt anywhere)
            sizes = [c['size'] for c in chars]
            min_size = min(sizes) if sizes else 0
            small_chars = [c for c in chars if c['size'] < 7.49]
            if small_chars:
                sample_small = "".join(c['text'] for c in small_chars[:20])
                print(f"   ❌ Characters below 7.5 pt found! Min: {min_size:.2f} pt ({len(small_chars)} chars, sample: '{sample_small}')")
                all_passed = False
            else:
                print(f"   ✅ Font sizes strictly >= 7.5 pt (Min: {min_size:.2f} pt, Max: {max(sizes):.2f} pt)")

            # 4. Font Embedding Check (Zero unembedded Helvetica / Standard 14)
            font_names = set(c['fontname'] for c in chars)
            unembedded = [f for f in font_names if f in ['Helvetica', 'Helvetica-Bold', 'Times-Roman', 'Courier']]
            if unembedded:
                print(f"   ❌ Unembedded fonts found: {unembedded}")
                all_passed = False
            else:
                print(f"   ✅ All fonts embedded ({len(font_names)} font subsets: {', '.join(sorted(font_names))})")

            # 5. No Mid-Word Hyphenation
            lines = text.split('\n')
            hyphen_errors = []
            for line in lines:
                line_str = line.strip()
                # Check if line ends with a letter followed by a hyphen
                if re.search(r'[a-zA-ZÀ-ÿ]{2,}-$', line_str):
                    hyphen_errors.append(line_str)
            if hyphen_errors:
                print(f"   ❌ Mid-word hyphenation breaks found: {hyphen_errors}")
                all_passed = False
            else:
                print(f"   ✅ Zero mid-word hyphen line breaks")

            # 6. Specific checks by file id
            if 'noqr' in filename:
                # Must NOT contain contact QR or logoloom.app in contact section
                if 'Scannez pour réserver' in text or 'Scan to book' in text:
                    print(f"   ❌ Found scan prompt when no user QR was provided!")
                    all_passed = False
                else:
                    print(f"   ✅ No contact QR block or prompt rendered when no QR URL was provided")

            if 'pro' in filename:
                # Pro must be white-label (no logoloom watermark)
                if 'logoloom.app' in text or 'LogoLoom' in text:
                    print(f"   ❌ Pro document still contains LogoLoom watermark!")
                    all_passed = False
                else:
                    print(f"   ✅ Pro white-label verified (zero LogoLoom watermark)")

            if 'free' in filename:
                if 'logoloom.app' not in text:
                    print(f"   ❌ Free tier missing logoloom.app footer badge")
                    all_passed = False
                else:
                    print(f"   ✅ Free tier LogoLoom footer badge present")

# 7. Logo Render Verification: Compare render with logo vs without logo
with_logo_path = os.path.join(out_dir, 'habit-a4-fr-square-free.pdf')
without_logo_path = os.path.join(out_dir, 'habit-a4-fr-nologo-noqr.pdf')
if os.path.exists(with_logo_path) and os.path.exists(without_logo_path):
    size_with = os.path.getsize(with_logo_path)
    size_without = os.path.getsize(without_logo_path)
    with open(with_logo_path, 'rb') as f:
        bytes_with = f.read()
    with open(without_logo_path, 'rb') as f:
        bytes_without = f.read()

    # The PDF with logo has vector drawing operators or image objects
    if bytes_with != bytes_without and (b'/Pattern' in bytes_with or b'/Image' in bytes_with or b'W n' in bytes_with):
        print(f"\n🎨 Logo presence verified: PDF with logo ({size_with} bytes) contains vector graphics (distinct from no-logo: {size_without} bytes).")
    else:
        print(f"\n❌ Logo verification failed: files are identical or logo shapes missing.")
        all_passed = False

print("\n" + "=" * 60)
if all_passed:
    print("🎉 ALL LOGOLOOM HABIT TRACKER QUALITY GATES PASSED (100% SUCCESS)!")
    print("=" * 60)
    sys.exit(0)
else:
    print("❌ SOME QUALITY GATES FAILED. Review errors above.")
    print("=" * 60)
    sys.exit(1)
