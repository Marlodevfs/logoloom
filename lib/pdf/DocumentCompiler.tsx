import React from 'react';
import { Document } from '@react-pdf/renderer';
import { BrandKit } from '@/types';
import { registerPDFFonts } from './fonts';
import { VectorHabitTrackerPDF } from './VectorHabitTrackerPDF';
import { VectorMinimalHabitTrackerPDF } from './VectorMinimalHabitTrackerPDF';
import { VectorRoadmap90PDF } from './VectorRoadmap90PDF';
import { VectorWelcomePacketPDF } from './VectorWelcomePacketPDF';

interface DocumentCompilerProps {
  brandKit: BrandKit;
}

export const DocumentCompiler: React.FC<DocumentCompilerProps> = ({ brandKit }) => {
  registerPDFFonts();

  const isMinimal = (brandKit.designStyle || 'minimal') === 'minimal';

  return (
    <Document
      title={`${brandKit.companyName || 'Document'} - ${brandKit.selectedTemplate || 'habit-tracker'}`}
      author={brandKit.coachName || 'LogoLoom'}
      subject="Brand Document"
      creator="LogoLoom Studio (https://logoloom.app)"
      keywords="pdf, brand, client, vector, print-ready"
    >
      {brandKit.selectedTemplate === 'roadmap-90' ? (
        <VectorRoadmap90PDF brandKit={brandKit} />
      ) : brandKit.selectedTemplate === 'welcome-packet' ? (
        <VectorWelcomePacketPDF brandKit={brandKit} />
      ) : isMinimal ? (
        <VectorMinimalHabitTrackerPDF brandKit={brandKit} />
      ) : (
        <VectorHabitTrackerPDF brandKit={brandKit} />
      )}
    </Document>
  );
};
