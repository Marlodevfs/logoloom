import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import confetti from 'canvas-confetti';
import { BrandKit, PaperSize, TemplateId } from '@/types';

export interface PDFExportOptions {
  element: HTMLElement;
  paperSize: PaperSize;
  fileName?: string;
  brandKit: BrandKit;
  templateId: TemplateId;
}

export async function exportToPDF({
  element,
  paperSize,
  fileName,
  brandKit,
  templateId,
}: PDFExportOptions): Promise<void> {
  try {
    // 1. Capture high-res PNG (scale 3x for 300 DPI print quality)
    const dataUrl = await toPng(element, {
      quality: 0.98,
      pixelRatio: 3,
      cacheBust: true,
      skipFonts: false,
    });

    // 2. Set dimensions according to paper standard
    const isA4 = paperSize === 'a4';
    const pdfWidth = isA4 ? 210 : 215.9; // mm
    const pdfHeight = isA4 ? 297 : 279.4; // mm

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: isA4 ? 'a4' : 'letter',
      compress: true,
    });

    // Set PDF Document Properties
    const docTitle = `${brandKit.companyName || 'Branded Document'} - ${templateId}`;
    pdf.setProperties({
      title: docTitle,
      subject: 'Print-ready branded document',
      author: brandKit.companyName || 'LogoLoom User',
      keywords: 'LogoLoom, habit tracker, roadmap, welcome packet, branding',
      creator: 'LogoLoom (https://logoloom.app)',
    });

    // 3. Add high-res image stretching to exact page boundary
    pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

    // 4. Save and trigger browser download
    const cleanCompanyName = (brandKit.companyName || 'LogoLoom')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 30);
    const finalFileName = fileName || `${cleanCompanyName}_${templateId}.pdf`;

    pdf.save(finalFileName);

    // 5. Tactile micro-celebration
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.85 },
      colors: [brandKit.brandColor, '#6366F1', '#10B981', '#F59E0B'],
      disableForReducedMotion: true,
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}
