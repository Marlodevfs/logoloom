import React from 'react';
import { Svg, Rect } from '@react-pdf/renderer';
import QRCode from 'qrcode';

interface VectorQRProps {
  text: string;
  size?: number;
  darkColor?: string;
  lightColor?: string;
}

export const VectorQR: React.FC<VectorQRProps> = ({
  text,
  size = 36,
  darkColor = '#0F172A',
  lightColor = '#FFFFFF',
}) => {
  const cleanText = text && text.trim().length > 0 ? text.trim() : 'https://logoloom.app';
  
  let qr;
  try {
    qr = QRCode.create(cleanText, { errorCorrectionLevel: 'H' });
  } catch (err) {
    qr = QRCode.create('https://logoloom.app', { errorCorrectionLevel: 'H' });
  }

  const moduleCount = qr.modules.size;
  const margin = 2;
  const totalGridSize = moduleCount + margin * 2;

  const rects: React.ReactNode[] = [];
  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (qr.modules.get(row, col)) {
        rects.push(
          <Rect
            key={`${row}-${col}`}
            x={col + margin}
            y={row + margin}
            width={1}
            height={1}
            fill={darkColor}
          />
        );
      }
    }
  }

  return (
    <Svg
      width={size}
      height={size}
      viewBox={`0 0 ${totalGridSize} ${totalGridSize}`}
    >
      <Rect
        x={0}
        y={0}
        width={totalGridSize}
        height={totalGridSize}
        fill={lightColor}
      />
      {rects}
    </Svg>
  );
};
