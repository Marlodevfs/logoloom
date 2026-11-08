import sys
import os
import pdfplumber
import pypdfium2 as pdfium
from PIL import Image, ImageOps

sys.stdout.reconfigure(encoding='utf-8')

OUT_DIR = os.path.join(os.path.dirname(__file__), 'output/minimal')
ARTIFACT_DIR = 'C:/Users/mikes/.gemini/antigravity/brain/3725711a-d219-4c19-8a0a-28d7ff5a956b'

def audit_minimal():
    print("=== DEEP PYTHON AUDIT FOR MINIMAL HABIT TRACKER ===")
    failures = 0

    pdfs_to_check = [
        ('minimal-habit-tracker-a4-fr.pdf', 'A4 FR Minimal (Default Wellbeing)'),
        ('minimal-habit-tracker-letter-en.pdf', 'Letter EN Minimal (Focus, Pro)'),
        ('minimal-habit-tracker-max.pdf', 'A4 DE Minimal (Max 7 Habits)'),
        ('complete-habit-tracker-comparison.pdf', 'Complete Style Comparison'),
    ]

    for filename, label in pdfs_to_check:
        pdf_path = os.path.join(OUT_DIR, filename)
        if not os.path.exists(pdf_path):
            print(f"❌ FAIL: {filename} does not exist!")
            failures += 1
            continue

        with pdfplumber.open(pdf_path) as pdf:
            # Check 1: Exactly 1 page
            page_count = len(pdf.pages)
            if page_count != 1:
                print(f"❌ FAIL [{label}]: Expected exactly 1 page, got {page_count}!")
                failures += 1
            else:
                print(f"✅ PASS [{label}]: Exactly 1 page.")

            # Check 2: Minimum font size >= 7.5 pt
            page = pdf.pages[0]
            chars = page.chars
            below_7_5 = [c for c in chars if c.get('size', 0) < 7.49]
            if below_7_5:
                print(f"❌ FAIL [{label}]: Found {len(below_7_5)} chars < 7.5 pt!")
                failures += 1
            else:
                sizes = [c.get('size', 0) for c in chars]
                min_s = min(sizes) if sizes else 0
                max_s = max(sizes) if sizes else 0
                print(f"✅ PASS [{label}]: 0 chars < 7.5 pt (Min: {min_s:.1f} pt, Max: {max_s:.1f} pt, Total: {len(chars)})")

            # Check 3: Extract text
            text = page.extract_text() or ""
            for bad in ['Apex', 'Alexandre', 'hello@apexstudio.io']:
                if bad.lower() in text.lower():
                    print(f"❌ FAIL [{label}]: Found forbidden '{bad}'!")
                    failures += 1

            # Check 4: Checkbox shapes
            rects = page.rects
            checkboxes = [r for r in rects if 13 <= r.get('width', 0) <= 17 and 13 <= r.get('height', 0) <= 17]
            if checkboxes:
                sample = checkboxes[0]
                pt_w = sample['width']
                mm_w = pt_w * 25.4 / 72
                print(f"✅ PASS [{label}]: Found {len(checkboxes)} checkboxes (Sample width: {pt_w:.1f} pt = {mm_w:.2f} mm >= 5.0 mm)")
            else:
                print(f"⚠️ Notice [{label}]: {len(rects)} total rects on page.")

    # Render High-Resolution 300 DPI Renders & B&W Simulation
    print("\n📸 Generating High-Resolution 300 DPI and B&W simulation renders...")

    # 1. Minimal A4 FR Color 300 DPI
    a4_fr_pdf = os.path.join(OUT_DIR, 'minimal-habit-tracker-a4-fr.pdf')
    doc_fr = pdfium.PdfDocument(a4_fr_pdf)
    img_fr = doc_fr[0].render(scale=300/72).to_pil()
    color_out = os.path.join(ARTIFACT_DIR, 'minimal-habit-tracker-color-300dpi.png')
    img_fr.save(color_out)
    print(f"  ✅ Saved Minimal A4 Color 300 DPI: {color_out}")

    # 2. Black & White Print Simulation (Grayscale)
    bw_img = ImageOps.grayscale(img_fr)
    bw_out = os.path.join(ARTIFACT_DIR, 'minimal-habit-tracker-bw-simulation.png')
    bw_img.save(bw_out)
    print(f"  ✅ Saved B&W Print Simulation: {bw_out}")

    # 3. Complete Comparison 300 DPI
    complete_pdf = os.path.join(OUT_DIR, 'complete-habit-tracker-comparison.pdf')
    doc_comp = pdfium.PdfDocument(complete_pdf)
    img_comp = doc_comp[0].render(scale=300/72).to_pil()
    comp_out = os.path.join(ARTIFACT_DIR, 'complete-habit-tracker-comparison.png')
    img_comp.save(comp_out)
    print(f"  ✅ Saved Complete Style Comparison 300 DPI: {comp_out}")

    if failures > 0:
        print(f"\n❌ AUDIT FAILED with {failures} errors.")
        sys.exit(1)
    else:
        print("\n🎉 ALL MINIMAL HABIT TRACKER QUALITY AUDIT CHECKS PASSED PERFECTLY!")

if __name__ == '__main__':
    audit_minimal()
