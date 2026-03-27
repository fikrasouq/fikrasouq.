export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="panel grid-fade relative overflow-hidden rounded-[2rem] px-6 py-12 text-center">
      <div className="motion-float absolute -top-6 right-10 h-20 w-20 rounded-full bg-brand-400/10 blur-3xl" />
      <div className="relative z-10">
        <div className="mx-auto mb-5 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[1.6rem] border border-white/10 bg-white/10 text-xl font-black text-brand-200 shadow-[0_16px_40px_rgba(248,171,50,0.12)]">
          FS
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-8 text-mist-300">{description}</p>
        {action ? <div className="mt-6">{action}</div> : null}
      </div>
    </div>
  );
}
