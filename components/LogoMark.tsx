/**
 * LogoLoom mark: a woven "L" (cream strand crossing an ochre thread, over/under like a loom).
 * Same drawing as app/icon.svg. The gaps use the tile colour, so they follow dark mode.
 */
export function LogoMark({ className = 'w-9 h-9' }: { className?: string }) {
  const tile = 'stroke-[#1F4436] dark:stroke-[#24513F]';
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <rect width="48" height="48" rx="11" className="fill-[#1F4436] dark:fill-[#24513F]" />
      <path d="M25 10v17" fill="none" stroke="#D09A3E" strokeWidth="5" strokeLinecap="round" />
      <path d="M21.5 22h7" fill="none" className={tile} strokeWidth="9" />
      <path d="M11 22h27" fill="none" stroke="#D09A3E" strokeWidth="5" strokeLinecap="round" />
      <path d="M17 17.5v9" fill="none" className={tile} strokeWidth="9" />
      <path d="M17 10v24h15" fill="none" stroke="#FBF8F2" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
