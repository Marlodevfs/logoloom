import React from 'react';
import { Document } from '@react-pdf/renderer';
import { BrandKit } from '@/types';
import { registerPDFFonts } from './fonts';
import { VectorHabitTrackerPDF } from './VectorHabitTrackerPDF';
import { VectorMinimalHabitTrackerPDF } from './VectorMinimalHabitTrackerPDF';
import { VectorRoadmap90PDF } from './VectorRoadmap90PDF';
import { VectorMinimalRoadmapPDF } from './VectorMinimalRoadmapPDF';
import { VectorWelcomePacketPDF } from './VectorWelcomePacketPDF';
import { VectorMinimalWelcomePacketPDF } from './VectorMinimalWelcomePacketPDF';

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
        isMinimal ? (
          <VectorMinimalRoadmapPDF brandKit={brandKit} />
        ) : (
          <VectorRoadmap90PDF brandKit={brandKit} />
        )
      ) : brandKit.selectedTemplate === 'welcome-packet' ? (
        isMinimal ? (
          <VectorMinimalWelcomePacketPDF brandKit={brandKit} />
        ) : (
          <VectorWelcomePacketPDF brandKit={brandKit} />
        )
      ) : isMinimal ? (
        <VectorMinimalHabitTrackerPDF brandKit={brandKit} />
      ) : (
        <VectorHabitTrackerPDF brandKit={brandKit} />
      )}
    </Document>
  );
};
