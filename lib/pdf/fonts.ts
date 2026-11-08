import { Font } from '@react-pdf/renderer';

let fontsRegistered = false;

export function registerPDFFonts() {
  if (fontsRegistered) return;

  try {
    if (typeof window !== 'undefined') {
      Font.register({
        family: 'Roboto',
        fonts: [
          { src: '/fonts/Roboto-Regular.ttf', fontWeight: 'normal' },
          { src: '/fonts/Roboto-Italic.ttf', fontStyle: 'italic' },
          { src: '/fonts/Roboto-Medium.ttf', fontWeight: 'medium' },
          { src: '/fonts/Roboto-Bold.ttf', fontWeight: 'bold' },
        ],
      });
    } else {
      // In Node.js / automated test environments
      const path = require('path');
      const base = path.join(process.cwd(), 'public', 'fonts');
      Font.register({
        family: 'Roboto',
        fonts: [
          { src: path.join(base, 'Roboto-Regular.ttf'), fontWeight: 'normal' },
          { src: path.join(base, 'Roboto-Italic.ttf'), fontStyle: 'italic' },
          { src: path.join(base, 'Roboto-Medium.ttf'), fontWeight: 'medium' },
          { src: path.join(base, 'Roboto-Bold.ttf'), fontWeight: 'bold' },
        ],
      });
    }
    fontsRegistered = true;
  } catch (err) {
    console.warn('Font registration fallback to Helvetica', err);
  }
}
