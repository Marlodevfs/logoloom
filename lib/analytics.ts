/**
 * LogoLoom Privacy-Friendly Event Analytics
 * Compatible with Plausible Analytics (cookieless, GDPR-compliant)
 */

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, any> }) => void;
  }
}

export type AnalyticsEvent =
  | 'logo_upload'
  | 'color_change'
  | 'template_select'
  | 'qr_added'
  | 'pdf_download'
  | 'pro_modal_open'
  | 'pro_upgrade_click';

export function trackEvent(event: AnalyticsEvent, props?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.plausible) {
    try {
      window.plausible(event, { props });
    } catch (e) {
      // safe fallback
    }
  }
  // Also log in dev console for verification
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics Event] ${event}`, props || {});
  }
}
