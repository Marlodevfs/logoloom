/**
 * LogoLoom Privacy-Friendly Event Analytics
 * The site loads GoatCounter (see app/[locale]/layout.tsx); Plausible is still
 * supported if its script is added later. Both are cookieless / GDPR-friendly.
 */

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, any> }) => void;
    goatcounter?: {
      count?: (vars: { path: string; title?: string; event?: boolean }) => void;
    };
  }
}

export type AnalyticsEvent =
  | 'logo_upload'
  | 'color_change'
  | 'template_select'
  | 'qr_added'
  | 'pdf_download'
  | 'pro_modal_open'
  | 'pro_upgrade_click'
  | 'bmc_click';

export function trackEvent(event: AnalyticsEvent, props?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    try {
      if (window.goatcounter?.count) {
        window.goatcounter.count({ path: event, title: event, event: true });
      } else if (window.plausible) {
        window.plausible(event, { props });
      }
    } catch (e) {
      // safe fallback
    }
  }
  // Also log in dev console for verification
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics Event] ${event}`, props || {});
  }
}
