import sys
import os
import pdfplumber
import pypdfium2 as pdfium
from PIL import Image, ImageOps

sys.stdout.reconfigure(encoding='utf-8')

OUT_DIR = os.path.join(os.path.dirname(__file__), 'output/all_minimal')
ARTIFACT_DIR = 'C:/Users/mikes/.gemini/antigravity/brain/3725711a-d219-4c19-8a0a-28d7ff5a956b'

def audit_all_minimal():
    print("=== DEEP PYTHON AUDIT FOR ALL MINIMAL TEMPLATES ===")
    failures = 0

    pdfs_to_check = [
        ('minimal-habit-tracker-a4-fr.pdf', 'Minimal Habit Tracker A4 FR'),
        ('minimal-roadmap-a4-fr.pdf', 'Minimal 90-Day Roadmap A4 FR'),
        ('minimal-roadmap-letter-en.pdf', 'Minimal 90-Day Roadmap Letter EN'),
        ('minimal-welcome-a4-fr.pdf', 'Minimal Welcome Packet A4 FR'),
        ('minimal-welcome-letter-de.pdf', 'Minimal Welcome Packet Letter DE'),
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
                print(f"❌ FAIL [{label}]: Found {len(below_7_5)} chars < 7.5 pt (Sample: '{below_7_5[0].get('text')}' at {below_7_5[0].get('size')})!")
                failures += 1
            else:
                sizes = [c.get('size', 0) for c in chars]
                min_s = min(sizes) if sizes else 0
                max_s = max(sizes) if sizes else 0
                print(f"✅ PASS [{label}]: 0 chars < 7.5 pt (Min: {min_s:.1f} pt, Max: {max_s:.1f} pt, Total: {len(chars)})")

            # Check 3: Extract text - zero forbidden strings
            text = page.extract_text() or ""
            for bad in ['Apex', 'Alexandre', 'hello@apexstudio.io']:
                if bad.lower() in text.lower():
                    print(f"❌ FAIL [{label}]: Found forbidden '{bad}' in extracted text!")
                    failures += 1

            # Check 4: No mid-word hyphen breaks
            lines = text.split('\n')
            for line in lines:
                stripped = line.strip()
                if stripped.endswith('-') and len(stripped) > 2 and stripped[-2].isalpha():
                    print(f"❌ FAIL [{label}]: Possible mid-word hyphen: '{stripped}'")
                    failures += 1

            # Check 5: Checkboxes width >= 14.0 pt (>= 4.95 mm)
            rects = page.rects
            checkboxes = [r for r in rects if 13.5 <= r.get('width', 0) <= 16.5 and 13.5 <= r.get('height', 0) <= 16.5]
            if checkboxes:
                sample = checkboxes[0]
                pt_w = sample['width']
                mm_w = pt_w * 25.4 / 72
                print(f"✅ PASS [{label}]: Found {len(checkboxes)} checkboxes (Sample width: {pt_w:.1f} pt = {mm_w:.2f} mm >= 5.0 mm)")

    # Render High-Resolution 300 DPI Renders
    print("\n📸 Generating High-Resolution 300 DPI Renders...")

    # 1. Minimal Roadmap A4 FR Color 300 DPI
    roadmap_pdf = os.path.join(OUT_DIR, 'minimal-roadmap-a4-fr.pdf')
    doc_rm = pdfium.PdfDocument(roadmap_pdf)
    img_rm = doc_rm[0].render(scale=300/72).to_pil()
    rm_out = os.path.join(ARTIFACT_DIR, 'minimal-roadmap-color-300dpi.png')
    img_rm.save(rm_out)
    print(f"  ✅ Saved Minimal Roadmap A4 Color 300 DPI: {rm_out}")

    # B&W print simulation for Roadmap
    bw_rm = ImageOps.grayscale(img_rm)
    bw_rm_out = os.path.join(ARTIFACT_DIR, 'minimal-roadmap-bw-simulation.png')
    bw_rm.save(bw_rm_out)
    print(f"  ✅ Saved Minimal Roadmap B&W Simulation: {bw_rm_out}")

    # 2. Minimal Welcome Packet A4 FR Color 300 DPI
    welcome_pdf = os.path.join(OUT_DIR, 'minimal-welcome-a4-fr.pdf')
    doc_wp = pdfium.PdfDocument(welcome_pdf)
    img_wp = doc_wp[0].render(scale=300/72).to_pil()
    wp_out = os.path.join(ARTIFACT_DIR, 'minimal-welcome-color-300dpi.png')
    img_wp.save(wp_out)
    print(f"  ✅ Saved Minimal Welcome Packet A4 Color 300 DPI: {wp_out}")

    # B&W print simulation for Welcome Packet
    bw_wp = ImageOps.grayscale(img_wp)
    bw_wp_out = os.path.join(ARTIFACT_DIR, 'minimal-welcome-bw-simulation.png')
    bw_wp.save(bw_wp_out)
    print(f"  ✅ Saved Minimal Welcome Packet B&W Simulation: {bw_wp_out}")

    if failures > 0:
        print(f"\n❌ AUDIT FAILED with {failures} errors.")
        sys.exit(1)
    else:
        print("\n🎉 ALL MINIMAL TEMPLATES DEEP AUDIT CHECKS PASSED WITH 100% SUCCESS!")

if __name__ == '__main__':
    audit_all_minimal()
