import QRCode from 'qrcode';

export interface QROptions {
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  margin?: number;
  width?: number;
  color?: {
    dark?: string;
    light?: string;
  };
}

/**
 * Generates a clean, print-grade Data URL QR code
 */
export async function generateQRCodeDataURL(
  text: string,
  options?: QROptions
): Promise<string> {
  const defaultOptions: QRCode.QRCodeToDataURLOptions = {
    errorCorrectionLevel: 'H',
    margin: 2,
    width: options?.width || 256,
    color: {
      dark: options?.color?.dark || '#000000',
      light: options?.color?.light || '#FFFFFF',
    },
  };

  try {
    const validUrl = text.trim() || 'https://logoloom.app';
    return await QRCode.toDataURL(validUrl, defaultOptions);
  } catch (err) {
    console.error('Failed to generate QR code', err);
    // Return empty 1px transparent gif if fatal failure
    return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  }
}
