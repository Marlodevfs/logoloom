/** LogoLoom mark: a planner page with a red bookmark ribbon. Same drawing as app/icon.svg. */
export function LogoMark({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <rect width="48" height="48" rx="11" className="fill-[#1E293B] dark:fill-[#334155]" />
      <rect x="10" y="8" width="28" height="32" rx="4" fill="#FFFFFF" />
      <rect x="15" y="17" width="12" height="2.6" rx="1.3" fill="#CBD5E1" />
      <rect x="15" y="23" width="18" height="2.6" rx="1.3" fill="#CBD5E1" />
      <rect x="15" y="29" width="15" height="2.6" rx="1.3" fill="#CBD5E1" />
      <path d="M29 6h6v15l-3-2.6-3 2.6z" fill="#F43F5E" />
    </svg>
  );
}
