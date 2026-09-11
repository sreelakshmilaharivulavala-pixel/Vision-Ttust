export default function ImpactFinder() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Risk mapping</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Impact Finder</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          ['Operational', 'Low', '3.1%'],
          ['Financial', 'Medium', '11.8%'],
          ['Reputational', 'High', '18.5%'],
        ].map(([label, severity, value]) => (
          <div key={label} className="soft-panel">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-3xl font-bold text-white">{value}</span>
              <span className={severity === 'High' ? 'text-rose-300' : severity === 'Medium' ? 'text-amber-300' : 'text-emerald-300'}>{severity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
