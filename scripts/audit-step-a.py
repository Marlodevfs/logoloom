import sys
import os
import pdfplumber

sys.stdout.reconfigure(encoding='utf-8')

OUT_DIR = os.path.join(os.path.dirname(__file__), 'output')

def audit_step_a():
    print("=== DEEP PYTHON AUDIT FOR STEP (A) ===")
    failures = 0

    # 1. Audit test-habit-tracker-empty.pdf
    empty_pdf = os.path.join(OUT_DIR, 'test-habit-tracker-empty.pdf')
    with pdfplumber.open(empty_pdf) as pdf:
        assert len(pdf.pages) == 1, f"Expected 1 page, got {len(pdf.pages)}"
        page = pdf.pages[0]
        text = page.extract_text() or ""
        
        # Check no hardcoded sample brand strings
        for bad_word in ['Apex', 'Alexandre', 'hello@apexstudio.io', 'LogoLoom Document']:
            if bad_word.lower() in text.lower():
                print(f"❌ FAIL: Found forbidden '{bad_word}' in empty PDF text!")
                failures += 1
            else:
                print(f"✅ PASS: No '{bad_word}' in empty PDF text.")

        # Check font sizes
        chars_below_7_5 = [c for c in page.chars if c.get('size', 0) < 7.49]
        if chars_below_7_5:
            print(f"❌ FAIL: Found {len(chars_below_7_5)} characters with font size < 7.5 pt!")
            failures += 1
        else:
            print(f"✅ PASS: 0 characters below 7.5 pt across entire page (Total chars: {len(page.chars)})")

    # 2. Audit test-habit-tracker-custom.pdf
    custom_pdf = os.path.join(OUT_DIR, 'test-habit-tracker-custom.pdf')
    with pdfplumber.open(custom_pdf) as pdf:
        assert len(pdf.pages) == 1, f"Expected 1 page, got {len(pdf.pages)}"
        page = pdf.pages[0]
        text = page.extract_text() or ""

        required_strings = [
            'Cabinet Bien-Être & Santé',
            'Dr. Sophie Laurent',
            'Boire 2L d’eau citronnée',
            'Thomas Dubreuil',
            'Réservez votre bilan 45 min'
        ]
        for req in required_strings:
            if req in text:
                print(f"✅ PASS: Custom string '{req}' extracted from PDF text layer!")
            else:
                print(f"❌ FAIL: Expected custom string '{req}' not found in PDF text layer!")
                failures += 1

        chars_below_7_5 = [c for c in page.chars if c.get('size', 0) < 7.49]
        if chars_below_7_5:
            print(f"❌ FAIL: Found {len(chars_below_7_5)} characters with font size < 7.5 pt!")
            failures += 1
        else:
            print(f"✅ PASS: 0 characters below 7.5 pt in custom PDF (Total chars: {len(page.chars)})")

    # 3. Audit all 6 packs
    for pack_id in ['wellbeing', 'fitness', 'nutrition', 'sleep', 'focus', 'blank']:
        pack_pdf = os.path.join(OUT_DIR, f'test-pack-{pack_id}.pdf')
        with pdfplumber.open(pack_pdf) as pdf:
            assert len(pdf.pages) == 1, f"Expected 1 page for pack {pack_id}, got {len(pdf.pages)}"
            p = pdf.pages[0]
            chars_below_7_5 = [c for c in p.chars if c.get('size', 0) < 7.49]
            if chars_below_7_5:
                print(f"❌ FAIL: Found chars < 7.5 pt in pack {pack_id}!")
                failures += 1
            else:
                print(f"✅ PASS: Pack [{pack_id}] has 1 single page and 0 chars < 7.5 pt.")

    # 4. Audit US Letter format
    letter_pdf = os.path.join(OUT_DIR, 'test-habit-tracker-letter.pdf')
    with pdfplumber.open(letter_pdf) as pdf:
        assert len(pdf.pages) == 1, f"Expected 1 page for Letter, got {len(pdf.pages)}"
        p = pdf.pages[0]
        chars_below_7_5 = [c for c in p.chars if c.get('size', 0) < 7.49]
        if chars_below_7_5:
            print(f"❌ FAIL: Found chars < 7.5 pt in Letter PDF!")
            failures += 1
        else:
            print(f"✅ PASS: US Letter PDF has 1 single page and 0 chars < 7.5 pt.")

    if failures > 0:
        print(f"\n❌ AUDIT FAILED with {failures} errors.")
        sys.exit(1)
    else:
        print("\n🎉 ALL STEP (A) PYTHON AUDIT CHECKS PASSED PERFECTLY!")

if __name__ == '__main__':
    audit_step_a()
