import React from 'react';
import { Document } from '@react-pdf/renderer';
import { BrandKit } from '@/types';
import { registerPDFFonts } from './fonts';
import { VectorHabitTrackerPDF } from './VectorHabitTrackerPDF';
import { VectorMinimalHabitTrackerPDF } from './VectorMinimalHabitTrackerPDF';
import { VectorGoalPlannerPDF } from './VectorGoalPlannerPDF';
import { VectorWeeklyPlannerPDF } from './VectorWeeklyPlannerPDF';
import { VectorMonthlyCalendarPDF } from './VectorMonthlyCalendarPDF';
import { VectorDailyPrioritiesPDF } from './VectorDailyPrioritiesPDF';
import { VectorMealPlannerPDF } from './VectorMealPlannerPDF';
import { VectorBudgetTrackerPDF } from './VectorBudgetTrackerPDF';
import { VectorChecklistPDF } from './VectorChecklistPDF';
import { VectorCvPDF } from './VectorCvPDF';
import { VectorLetterPDF } from './VectorLetterPDF';

interface DocumentCompilerProps {
  brandKit: BrandKit;
  /** 'letter' renders the cover letter written next to the CV. */
  doc?: 'letter';
}

export const DocumentCompiler: React.FC<DocumentCompilerProps> = ({ brandKit, doc }) => {
  registerPDFFonts();

  // The cover letter goes to employers too: metadata names the candidate only.
  if (doc === 'letter') {
    const name = brandKit.cvContent?.fullName?.trim() || 'Letter';
    return (
      <Document title={name} author={name} subject="Cover letter" creator={name} producer={name}>
        <VectorLetterPDF brandKit={brandKit} />
      </Document>
    );
  }

  const isMinimal = (brandKit.designStyle || 'minimal') === 'minimal';
  const isProMode = Boolean(brandKit.removeWatermark || brandKit.isPro);
  const template = brandKit.selectedTemplate || 'habit-tracker';

  const renderTemplatePage = () => {
    switch (template) {
      case 'habit-tracker':
        return isMinimal ? (
          <VectorMinimalHabitTrackerPDF brandKit={brandKit} />
        ) : (
          <VectorHabitTrackerPDF brandKit={brandKit} />
        );
      case 'goal-planner-90':
        return <VectorGoalPlannerPDF brandKit={brandKit} />;
      case 'weekly-planner':
        return <VectorWeeklyPlannerPDF brandKit={brandKit} />;
      case 'monthly-calendar':
        return <VectorMonthlyCalendarPDF brandKit={brandKit} />;
      case 'daily-priorities':
        return <VectorDailyPrioritiesPDF brandKit={brandKit} />;
      case 'meal-planner':
        return <VectorMealPlannerPDF brandKit={brandKit} />;
      case 'budget-tracker':
        return <VectorBudgetTrackerPDF brandKit={brandKit} />;
      case 'checklist':
        return <VectorChecklistPDF brandKit={brandKit} />;
      case 'cv':
        return <VectorCvPDF brandKit={brandKit} />;
      default:
        return <VectorMinimalHabitTrackerPDF brandKit={brandKit} />;
    }
  };

  // A CV goes to employers: its metadata names the candidate only, never LogoLoom.
  if (template === 'cv') {
    const name = brandKit.cvContent?.fullName?.trim() || 'CV';
    return (
      <Document title={`CV - ${name}`} author={name} subject="Curriculum vitae" creator={name} producer={name}>
        {renderTemplatePage()}
      </Document>
    );
  }

  return (
    <Document
      title={`${brandKit.companyName || 'Document'} - ${template}`}
      author={brandKit.coachName || brandKit.companyName || (isProMode ? 'Document' : 'LogoLoom')}
      subject="Brand Document"
      creator={isProMode ? (brandKit.companyName || 'Vector PDF') : 'LogoLoom Studio (https://logoloom.app)'}
      keywords="pdf, brand, client, vector, print-ready"
    >
      {renderTemplatePage()}
    </Document>
  );
};
