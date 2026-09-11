export default function HashComparison({ registeredHash, currentHash, difference = '0.00%' }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">Hash comparison</h3>
        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-300">
          Integrity check
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Registered hash</p>
          <p className="mt-3 break-all font-mono text-xs text-emerald-300">{registeredHash}</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Current hash</p>
          <p className="mt-3 break-all font-mono text-xs text-rose-300">{currentHash}</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Difference</span>
          <span className="font-semibold text-white">{difference}</span>
        </div>
      </div>
    </div>
  );
}
