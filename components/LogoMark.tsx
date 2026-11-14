/**
 * LogoLoom mark: a woven "L" (white strand crossing a red thread, over/under like a loom).
 * Same drawing as app/icon.svg. The gaps use the tile colour, so they follow dark mode.
 */
export function LogoMark({ className = 'w-9 h-9' }: { className?: string }) {
  const tile = 'stroke-[#1E293B] dark:stroke-[#334155]';
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <rect width="48" height="48" rx="11" className="fill-[#1E293B] dark:fill-[#334155]" />
      <path d="M25 10v17" fill="none" stroke="#F43F5E" strokeWidth="5" strokeLinecap="round" />
      <path d="M21.5 22h7" fill="none" className={tile} strokeWidth="9" />
      <path d="M11 22h27" fill="none" stroke="#F43F5E" strokeWidth="5" strokeLinecap="round" />
      <path d="M17 17.5v9" fill="none" className={tile} strokeWidth="9" />
      <path d="M17 10v24h15" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
