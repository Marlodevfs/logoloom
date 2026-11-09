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
import { VectorQuotePDF } from './VectorQuotePDF';
import { VectorInvoicePDF } from './VectorInvoicePDF';
import { VectorPriceListPDF } from './VectorPriceListPDF';
import { VectorClientTrackerPDF } from './VectorClientTrackerPDF';
import { VectorChecklistPDF } from './VectorChecklistPDF';

interface DocumentCompilerProps {
  brandKit: BrandKit;
}

export const DocumentCompiler: React.FC<DocumentCompilerProps> = ({ brandKit }) => {
  registerPDFFonts();

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
      case 'quote':
        return <VectorQuotePDF brandKit={brandKit} />;
      case 'invoice':
        return <VectorInvoicePDF brandKit={brandKit} />;
      case 'price-list':
        return <VectorPriceListPDF brandKit={brandKit} />;
      case 'client-tracker':
        return <VectorClientTrackerPDF brandKit={brandKit} />;
      case 'checklist':
        return <VectorChecklistPDF brandKit={brandKit} />;
      default:
        return <VectorMinimalHabitTrackerPDF brandKit={brandKit} />;
    }
  };

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
