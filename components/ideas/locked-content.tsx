function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-none stroke-current stroke-[1.8]">
      <path d="M8 10V8a4 4 0 1 1 8 0v2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="5" y="10" width="14" height="10" rx="3" />
      <path d="M12 14v2.5" strokeLinecap="round" />
    </svg>
  );
}

export function LockedContent({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 p-5">
      <div className="space-y-4 blur-[5px] opacity-45">
        <div className="h-5 w-48 rounded-full bg-white/10" />
        <div className="grid gap-3 md:grid-cols-2">
          <div className="h-24 rounded-[1.4rem] bg-white/10" />
          <div className="h-24 rounded-[1.4rem] bg-white/10" />
          <div className="h-24 rounded-[1.4rem] bg-white/10" />
          <div className="h-24 rounded-[1.4rem] bg-white/10" />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,7,10,0.12)] via-[rgba(5,7,10,0.72)] to-[rgba(5,7,10,0.92)]" />

      <div className="absolute inset-x-5 top-1/2 -translate-y-1/2 rounded-[1.8rem] border border-white/10 bg-[rgba(10,12,18,0.82)] p-6 text-center shadow-[0_24px_60px_rgba(0,0,0,0.34)] backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[1.2rem] border border-brand-400/20 bg-brand-400/10 text-brand-100">
          <LockIcon />
        </div>
        <h3 className="mt-4 text-xl font-black text-white">{title}</h3>
        <p className="mt-3 text-sm leading-8 text-mist-200">{description}</p>
      </div>
    </div>
  );
}
