import React from 'react';
import { Page, View, Text, Image, Svg, Line, Circle } from '@react-pdf/renderer';
import type { BrandKit, BusinessCardContent } from '@/types';
import { BLEED_MM, MM, getDefaultCardContent, sheetLayout } from '@/lib/i18n/card-data';
import { CardDrawing, cardHasBack, drawCard } from '@/lib/card-layout';
import { VectorQR } from './VectorQR';

const WEIGHT = { bold: 'bold', medium: 'medium', normal: 'normal' } as const;

/** Draws one card face at (left, top) on the current page. */
function Face({ d, left, top, logoUrl }: { d: CardDrawing; left: number; top: number; logoUrl: string | null }) {
  return (
    <View style={{ position: 'absolute', left, top, width: d.W, height: d.H, overflow: 'hidden' }}>
      {d.els.map((el, i) => {
        switch (el.kind) {
          case 'rect':
            return (
              <View
                key={i}
                style={{ position: 'absolute', left: el.x, top: el.y, width: el.w, height: el.h, backgroundColor: el.fill, borderRadius: el.radius || 0 }}
              />
            );
          case 'line':
            return <View key={i} style={{ position: 'absolute', left: el.x, top: el.y, width: el.w, height: 0.9, backgroundColor: el.color }} />;
          case 'text':
            return (
              <Text
                key={i}
                style={{
                  maxLines: 1,
                  position: 'absolute',
                  left: el.x,
                  top: el.y,
                  width: el.w,
                  fontFamily: 'Roboto',
                  fontSize: el.size,
                  fontWeight: WEIGHT[el.weight],
                  color: el.color,
                  lineHeight: 1.25,
                  textAlign: el.align,
                  textOverflow: 'ellipsis',
                }}
              >
                {el.text}
              </Text>
            );
          case 'logo':
            return logoUrl ? (
              <View
                key={i}
                style={{
                  position: 'absolute',
                  left: el.x,
                  top: el.y,
                  width: el.w,
                  height: el.h,
                  flexDirection: 'row',
                  justifyContent: el.align === 'center' ? 'center' : 'flex-start',
                  alignItems: 'center',
                }}
              >
                <Image src={logoUrl} style={{ maxWidth: el.w, maxHeight: el.h, objectFit: 'contain' }} />
              </View>
            ) : null;
          case 'initials':
            return (
              <View
                key={i}
                style={{
                  position: 'absolute',
                  left: el.x,
                  top: el.y,
                  width: el.size,
                  height: el.size,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {el.bg ? (
                  <Svg width={el.size} height={el.size} viewBox={`0 0 ${el.size} ${el.size}`} style={{ position: 'absolute', left: 0, top: 0 }}>
                    <Circle cx={el.size / 2} cy={el.size / 2} r={el.size / 2} fill={el.bg} />
                  </Svg>
                ) : null}
                <Text style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: el.size * (el.bg ? 0.4 : 0.55), color: el.color }}>{el.text}</Text>
              </View>
            );
          case 'qr':
            return (
              <View key={i} style={{ position: 'absolute', left: el.x, top: el.y }}>
                <VectorQR text={el.text} size={el.size} />
              </View>
            );
          default:
            return null;
        }
      })}
    </View>
  );
}

/** Crop marks outside the grid, at every column and row boundary. */
function CropMarks({ x0, y0, cols, rows, cw, ch, pageW, pageH }: { x0: number; y0: number; cols: number; rows: number; cw: number; ch: number; pageW: number; pageH: number }) {
  const gap = 2 * MM;
  const len = 5 * MM;
  const lines: React.ReactNode[] = [];
  const gridW = cols * cw;
  const gridH = rows * ch;
  for (let i = 0; i <= cols; i++) {
    const x = x0 + i * cw;
    lines.push(<Line key={`t${i}`} x1={x} y1={y0 - gap - len} x2={x} y2={y0 - gap} stroke="#000000" strokeWidth={0.3} />);
    lines.push(<Line key={`b${i}`} x1={x} y1={y0 + gridH + gap} x2={x} y2={y0 + gridH + gap + len} stroke="#000000" strokeWidth={0.3} />);
  }
  for (let j = 0; j <= rows; j++) {
    const y = y0 + j * ch;
    lines.push(<Line key={`l${j}`} x1={x0 - gap - len} y1={y} x2={x0 - gap} y2={y} stroke="#000000" strokeWidth={0.3} />);
    lines.push(<Line key={`r${j}`} x1={x0 + gridW + gap} y1={y} x2={x0 + gridW + gap + len} y2={y} stroke="#000000" strokeWidth={0.3} />);
  }
  return (
    <Svg style={{ position: 'absolute', left: 0, top: 0 }} width={pageW} height={pageH} viewBox={`0 0 ${pageW} ${pageH}`}>
      {lines}
    </Svg>
  );
}

/**
 * Business card PDF.
 * - 'sheet': A4 / Letter pages filled with cards and crop marks (front page, then back page for duplex).
 * - 'printer': one card per page with 3 mm bleed, the format print shops ask for.
 * Nothing is printed on the cards but the card itself.
 */
export const VectorBusinessCardPDF: React.FC<{ brandKit: BrandKit }> = ({ brandKit }) => {
  const c: BusinessCardContent = brandKit.cardContent || getDefaultCardContent(brandKit.documentLang || 'en');
  const style = { accent: brandKit.brandColor || '#2340A8', logoUrl: brandKit.logoUrl || null };
  const sides: ('front' | 'back')[] = cardHasBack(c) ? ['front', 'back'] : ['front'];

  if (c.output === 'printer') {
    return (
      <>
        {sides.map((side) => {
          const d = drawCard(c, side, style, BLEED_MM);
          return (
            <Page key={side} size={[d.W, d.H]} style={{ position: 'relative' }}>
              <Face d={d} left={0} top={0} logoUrl={style.logoUrl} />
            </Page>
          );
        })}
      </>
    );
  }

  const paper = brandKit.paperSize === 'letter' ? 'letter' : 'a4';
  const g = sheetLayout(paper, c.cardSize);
  const pageW = g.page.w * MM;
  const pageH = g.page.h * MM;
  const cw = g.card.w * MM;
  const ch = g.card.h * MM;
  const x0 = g.x0 * MM;
  const y0 = g.y0 * MM;

  return (
    <>
      {sides.map((side) => {
        const d = drawCard(c, side, style, 0);
        const cells: React.ReactNode[] = [];
        for (let r = 0; r < g.rows; r++) {
          for (let col = 0; col < g.cols; col++) {
            // Duplex on the long edge mirrors columns: the grid is centred, so the back lines up.
            const cx = side === 'back' ? g.cols - 1 - col : col;
            cells.push(<Face key={`${r}-${col}`} d={d} left={x0 + cx * cw} top={y0 + r * ch} logoUrl={style.logoUrl} />);
          }
        }
        return (
          <Page key={side} size={[pageW, pageH]} style={{ position: 'relative', backgroundColor: '#FFFFFF' }}>
            {cells}
            <CropMarks x0={x0} y0={y0} cols={g.cols} rows={g.rows} cw={cw} ch={ch} pageW={pageW} pageH={pageH} />
          </Page>
        );
      })}
    </>
  );
};
