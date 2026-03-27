export default function Loading() {
  return (
    <div className="shell mt-10">
      <div className="panel animate-pulse space-y-6 p-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-white/10" />
          <div className="h-8 w-52 rounded-full bg-white/10" />
        </div>
        <div className="h-20 w-full rounded-[2rem] bg-white/10" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-52 rounded-[2rem] bg-white/10" />
          <div className="h-52 rounded-[2rem] bg-white/10" />
          <div className="h-52 rounded-[2rem] bg-white/10" />
        </div>
        <div className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
          <div className="h-80 rounded-[2rem] bg-white/10" />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="h-72 rounded-[2rem] bg-white/10" />
            <div className="h-72 rounded-[2rem] bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
