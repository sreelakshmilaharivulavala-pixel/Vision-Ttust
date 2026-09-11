export default function IncidentCenter() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Response center</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Incident Center</h1>
      </div>

      <div className="soft-panel">
        <div className="space-y-4">
          {[
            ['AI drift warning', 'Detected in model validation flow', 'High'],
            ['Metadata inconsistency', 'Contributor chain mismatch', 'Medium'],
            ['Inference audit passed', 'No active anomaly', 'Low'],
          ].map(([title, desc, severity]) => (
            <div key={title} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <div>
                <p className="font-medium text-white">{title}</p>
                <p className="mt-1 text-sm text-slate-400">{desc}</p>
              </div>
              <span className={severity === 'High' ? 'text-rose-300' : severity === 'Medium' ? 'text-amber-300' : 'text-emerald-300'}>{severity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
