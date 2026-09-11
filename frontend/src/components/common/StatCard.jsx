export default function StatCard({ title, value, subtitle, accent = 'cyan' }) {
  const accentClass = {
    cyan: 'from-cyan-500/20 to-cyan-500/5 text-cyan-300 border-cyan-500/20',
    green: 'from-emerald-500/20 to-emerald-500/5 text-emerald-300 border-emerald-500/20',
    amber: 'from-amber-500/20 to-amber-500/5 text-amber-300 border-amber-500/20',
    rose: 'from-rose-500/20 to-rose-500/5 text-rose-300 border-rose-500/20',
    violet: 'from-violet-500/20 to-violet-500/5 text-violet-300 border-violet-500/20',
  }[accent];

  return (
    <div className={`rounded-2xl border bg-gradient-to-br p-4 shadow-lg ${accentClass}`}>
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{title}</p>
      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
          {subtitle && <p className="mt-2 text-sm text-slate-400">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
