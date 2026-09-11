export default function StatusBadge({ status, compact = false }) {
  const palette = {
    VERIFIED: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
    TAMPERED: 'border-rose-500/30 bg-rose-500/10 text-rose-300',
    BLOCKED: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
    QUARANTINED: 'border-violet-500/30 bg-violet-500/10 text-violet-300',
    UNKNOWN: 'border-slate-500/30 bg-slate-500/10 text-slate-300',
  };

  const label = status || 'UNKNOWN';

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${palette[label] || palette.UNKNOWN} ${compact ? 'min-w-[110px]' : ''}`}
    >
      {label}
    </span>
  );
}
