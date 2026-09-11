export default function BlockchainEvidence() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Immutable proof</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Blockchain Evidence</h1>
      </div>

      <div className="soft-panel">
        <div className="space-y-4">
          {[
            ['Dataset hash', '0x8FD2...3D9A', 'Verified'],
            ['Model checksum', '0xB7FA...4C11', 'Verified'],
            ['Inference attestation', '0x912E...AA40', 'Pending review'],
          ].map(([label, hash, state]) => (
            <div key={label} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
                <p className="mt-2 font-mono text-sm text-slate-200">{hash}</p>
              </div>
              <span className={state === 'Verified' ? 'text-emerald-300' : 'text-amber-300'}>{state}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
