import React from 'react';
import { pdf } from '@react-pdf/renderer';
import confetti from 'canvas-confetti';
import { BrandKit, PaperSize, TemplateId } from '@/types';
import { DocumentCompiler } from './pdf/DocumentCompiler';
import { LETTER_FILE_PREFIX } from './i18n/letter-data';

export interface PDFExportOptions {
  element?: HTMLElement;
  paperSize?: PaperSize;
  fileName?: string;
  brandKit: BrandKit;
  templateId: TemplateId;
  /** 'letter' exports the cover letter instead of the template. */
  doc?: 'letter';
}

export async function exportToPDF({
  paperSize,
  fileName,
  brandKit,
  templateId,
  doc,
}: PDFExportOptions): Promise<void> {
  try {
    const finalKit: BrandKit = {
      ...brandKit,
      paperSize: paperSize || brandKit.paperSize || 'a4',
      selectedTemplate: templateId,
    };

    // 1. Compile pure vector PDF with embedded Roboto fonts & selectable text
    const docElement = React.createElement(DocumentCompiler, { brandKit: finalKit, doc });
    const blob = await pdf(docElement as any).toBlob();

    // 2. Format download filename
    const slug = (text: string) =>
      text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // "Société" -> "Societe" instead of "Soci_t_"
        .replace(/[^a-zA-Z0-9_-]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '')
        .slice(0, 40);
    // A CV is sent to employers: name it after the candidate ("CV_Jean_Dupont.pdf").
    const letterPrefix = LETTER_FILE_PREFIX[finalKit.documentLang || 'en'] || LETTER_FILE_PREFIX.en;
    const defaultName =
      doc === 'letter'
        ? `${letterPrefix}_${slug(finalKit.cvContent?.fullName || '')}`.replace(/_$/, '') + '.pdf'
        : templateId === 'cv'
        ? `CV_${slug(finalKit.cvContent?.fullName || '') || 'CV'}.pdf`.replace('CV_CV.pdf', 'CV.pdf')
        : `${slug(finalKit.companyName || 'LogoLoom') || 'LogoLoom'}_${templateId}.pdf`;
    const finalFileName = fileName || defaultName;

    // 3. Trigger direct browser download
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = finalFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

    // 4. Tactile celebration confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.85 },
      colors: [brandKit.brandColor, '#6366F1', '#10B981', '#F59E0B'],
      disableForReducedMotion: true,
    });
  } catch (error) {
    console.error('Error generating vector PDF:', error);
    throw error;
  }
}
