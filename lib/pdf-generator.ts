import React from 'react';
import { pdf } from '@react-pdf/renderer';
import confetti from 'canvas-confetti';
import { BrandKit, PaperSize, TemplateId } from '@/types';
import { DocumentCompiler } from './pdf/DocumentCompiler';

export interface PDFExportOptions {
  element?: HTMLElement;
  paperSize?: PaperSize;
  fileName?: string;
  brandKit: BrandKit;
  templateId: TemplateId;
}

export async function exportToPDF({
  paperSize,
  fileName,
  brandKit,
  templateId,
}: PDFExportOptions): Promise<void> {
  try {
    const finalKit: BrandKit = {
      ...brandKit,
      paperSize: paperSize || brandKit.paperSize || 'a4',
      selectedTemplate: templateId,
    };

    // 1. Compile pure vector PDF with embedded Roboto fonts & selectable text
    const docElement = React.createElement(DocumentCompiler, { brandKit: finalKit });
    const blob = await pdf(docElement as any).toBlob();

    // 2. Format download filename
    const cleanCompanyName = (finalKit.companyName || 'LogoLoom')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // "Société" -> "Societe" instead of "Soci_t_"
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 30);
    const finalFileName = fileName || `${cleanCompanyName}_${templateId}.pdf`;

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
