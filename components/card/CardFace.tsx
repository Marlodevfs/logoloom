'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import QRCode from 'qrcode';
import type { BusinessCardContent } from '@/types';
import { CardStyle, drawCard } from '@/lib/card-layout';

const PT_TO_PX = 4 / 3;

function HtmlQR({ text, size }: { text: string; size: number }) {
  const cells = useMemo(() => {
    try {
      const qr = QRCode.create(text, { errorCorrectionLevel: 'H' });
      const n = qr.modules.size;
      const out: { x: number; y: number }[] = [];
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.modules.get(r, c)) out.push({ x: c, y: r });
      return { n, out };
    } catch {
      return null;
    }
  }, [text]);
  if (!cells) return null;
  const total = cells.n + 4;
  return (
    <svg width={`${size}pt`} height={`${size}pt`} viewBox={`0 0 ${total} ${total}`} shapeRendering="crispEdges" aria-hidden="true">
      <rect width={total} height={total} fill="#FFFFFF" />
      {cells.out.map((m, i) => (
        <rect key={i} x={m.x + 2} y={m.y + 2} width={1} height={1} fill="#0F172A" />
      ))}
    </svg>
  );
}

/**
 * One side of the business card, drawn from the same layout as the PDF
 * (lib/card-layout.ts) and scaled to the width of its container.
 */
export function CardFace({
  card,
  side,
  style,
  className = '',
}: {
  card: BusinessCardContent;
  side: 'front' | 'back';
  style: CardStyle;
  className?: string;
}) {
  const d = drawCard(card, side, style, 0);
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const widthPx = d.W * PT_TO_PX;

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / widthPx);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [widthPx]);

  return (
    <div ref={boxRef} className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: `${d.W} / ${d.H}` }}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: `${d.W}pt`,
          height: `${d.H}pt`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          fontFamily: 'Roboto, Inter, system-ui, sans-serif',
        }}
      >
        {d.els.map((el, i) => {
          switch (el.kind) {
            case 'rect':
              return (
                <div
                  key={i}
                  style={{ position: 'absolute', left: `${el.x}pt`, top: `${el.y}pt`, width: `${el.w}pt`, height: `${el.h}pt`, background: el.fill, borderRadius: `${el.radius || 0}pt` }}
                />
              );
            case 'line':
              return <div key={i} style={{ position: 'absolute', left: `${el.x}pt`, top: `${el.y}pt`, width: `${el.w}pt`, height: '0.9pt', background: el.color }} />;
            case 'text':
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: `${el.x}pt`,
                    top: `${el.y}pt`,
                    width: `${el.w}pt`,
                    fontSize: `${el.size}pt`,
                    lineHeight: 1.25,
                    fontWeight: el.weight === 'bold' ? 700 : el.weight === 'medium' ? 500 : 400,
                    color: el.color,
                    textAlign: el.align,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {el.text}
                </div>
              );
            case 'logo':
              return style.logoUrl ? (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: `${el.x}pt`,
                    top: `${el.y}pt`,
                    width: `${el.w}pt`,
                    height: `${el.h}pt`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: el.align === 'center' ? 'center' : 'flex-start',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={style.logoUrl} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
              ) : null;
            case 'initials':
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: `${el.x}pt`,
                    top: `${el.y}pt`,
                    width: `${el.size}pt`,
                    height: `${el.size}pt`,
                    borderRadius: '50%',
                    background: el.bg || 'transparent',
                    color: el.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: `${el.size * (el.bg ? 0.4 : 0.55)}pt`,
                  }}
                >
                  {el.text}
                </div>
              );
            case 'qr':
              return (
                <div key={i} style={{ position: 'absolute', left: `${el.x}pt`, top: `${el.y}pt`, lineHeight: 0 }}>
                  <HtmlQR text={el.text} size={el.size} />
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
