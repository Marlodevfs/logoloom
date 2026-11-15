'use client';

import React, { useEffect, useRef } from 'react';

interface SignaturePadProps {
  value: string | null;
  onChange: (dataUrl: string | null) => void;
  drawHere: string;
  clear: string;
  importImage: string;
  importError: string;
  roomy?: boolean;
}

const W = 600;
const H = 200;

/** Crops the drawing to its ink so the signature sits tight in the PDF. */
function trimmedPng(canvas: HTMLCanvasElement): string | null {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let top = height, left = width, right = -1, bottom = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 0) {
        if (x < left) left = x;
        if (x > right) right = x;
        if (y < top) top = y;
        if (y > bottom) bottom = y;
      }
    }
  }
  if (right < 0) return null;
  const pad = 6;
  left = Math.max(0, left - pad);
  top = Math.max(0, top - pad);
  right = Math.min(width - 1, right + pad);
  bottom = Math.min(height - 1, bottom + pad);
  const out = document.createElement('canvas');
  out.width = right - left + 1;
  out.height = bottom - top + 1;
  out.getContext('2d')?.drawImage(canvas, left, top, out.width, out.height, 0, 0, out.width, out.height);
  return out.toDataURL('image/png');
}

/** Imported image: shrunk to a small PNG, white background made transparent. */
function importSignature(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 500 / img.width, 200 / img.height);
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('no canvas'));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      // A photo of a signature on paper: drop the near-white paper.
      const px = ctx.getImageData(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < px.data.length; i += 4) {
        if (px.data[i] > 215 && px.data[i + 1] > 215 && px.data[i + 2] > 215) px.data[i + 3] = 0;
      }
      ctx.putImageData(px, 0, 0);
      URL.revokeObjectURL(url);
      resolve(trimmedPng(canvas) || canvas.toDataURL('image/png'));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('unreadable image'));
    };
    img.src = url;
  });
}

/** Sign with the mouse or a finger. The result stays in the browser like the rest of the CV. */
export function SignaturePad({ value, onChange, drawHere, clear, importImage, importError, roomy }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [error, setError] = React.useState(false);
  // The value this pad produced itself: no redraw for it, or each stroke would re-center the ink.
  const emitted = useRef<string | null>(null);

  // Show the saved signature on the pad.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || drawing.current) return;
    if (value && value === emitted.current) return;
    ctx.clearRect(0, 0, W, H);
    if (!value) return;
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, (W - 20) / img.width, (H - 20) / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
    };
    img.src = value;
  }, [value]);

  const point = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: ((e.clientX - rect.left) / rect.width) * W, y: ((e.clientY - rect.top) / rect.height) * H };
  };

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    last.current = point(e);
  };
  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || !last.current) return;
    const ctx = e.currentTarget.getContext('2d');
    if (!ctx) return;
    const p = point(e);
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 3.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
  };
  const onUp = () => {
    if (!drawing.current) return;
    drawing.current = false;
    last.current = null;
    if (!canvasRef.current) return;
    const png = trimmedPng(canvasRef.current);
    emitted.current = png;
    onChange(png);
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      setError(false);
      onChange(await importSignature(file));
    } catch {
      setError(true);
    }
  };

  const link = roomy
    ? 'text-sm font-bold text-ink-700 dark:text-ink-300 underline underline-offset-4 decoration-ink-200 hover:decoration-ink-600'
    : 'text-[10.5px] font-semibold text-indigo-700 hover:underline';

  return (
    <div>
      <div className="relative rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-white">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          aria-label={drawHere}
          className="block w-full h-auto touch-none cursor-crosshair"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        />
        {!value && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-slate-400 text-center px-4">
            {drawHere}
          </span>
        )}
        <span className="pointer-events-none absolute left-6 right-6 bottom-[22%] border-b border-slate-200" />
      </div>
      <div className="mt-2 flex items-center gap-4">
        <button type="button" onClick={() => fileRef.current?.click()} className={link}>
          {importImage}
        </button>
        {value && (
          <button type="button" onClick={() => onChange(null)} className={`${roomy ? 'text-sm' : 'text-[10.5px]'} text-rose-600 hover:underline`}>
            {clear}
          </button>
        )}
      </div>
      {error && <p role="alert" className="mt-1 text-sm text-rose-600">{importError}</p>}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
    </div>
  );
}
