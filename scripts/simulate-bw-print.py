import sys
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

import pypdfium2 as pdfium
import os
from PIL import Image

artifact_dir = r'C:\Users\mikes\.gemini\antigravity\brain\3725711a-d219-4c19-8a0a-28d7ff5a956b'
pdf_path = os.path.join(os.path.dirname(__file__), 'output/quality-gates/habit-a4-fr-square-free.pdf')

# Render PDF to 300 DPI
pdf = pdfium.PdfDocument(pdf_path)
page = pdf[0]
bitmap = page.render(scale=300/72) # 300 DPI scale
pil_image = bitmap.to_pil()

# Save 300 DPI full color render
color_path = os.path.join(artifact_dir, 'habit-tracker-300dpi-color.png')
pil_image.save(color_path)
print(f'✅ Saved 300 DPI color render to {color_path}')

# Convert to Black and White / Grayscale print simulation
bw_image = pil_image.convert('L')
bw_path = os.path.join(artifact_dir, 'habit-tracker-bw-simulation.png')
bw_image.save(bw_path)
print(f'✅ Saved B&W print simulation to {bw_path}')
