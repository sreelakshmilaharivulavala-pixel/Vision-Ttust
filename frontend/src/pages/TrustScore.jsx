import { motion } from 'framer-motion';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const scoreBreakdown = [
  { label: 'Image Integrity', value: 96, reason: 'High provenance compliance across dataset batches; only 1 anomaly in the last cycle.' },
  { label: 'Model Integrity', value: 94, reason: 'Model checksums and releases are consistently validated with low drift.' },
  { label: 'Prediction Verification', value: 95, reason: 'Inference confidence remains stable and disputes are below baseline thresholds.' },
  { label: 'Blockchain Evidence', value: 92, reason: 'Hashes are recorded and synchronized, with minor latency in a few records.' },
  { label: 'Contributor History', value: 93, reason: 'Contributor review records remain strong with low incident churn.' },
  { label: 'Pipeline Consistency', value: 94, reason: 'Cross-stage validation is stable across image, model, and inference flows.' },
];

const scoreTrend = [
  { month: 'Jan', score: 85 },
  { month: 'Feb', score: 88 },
  { month: 'Mar', score: 89 },
  { month: 'Apr', score: 91 },
  { month: 'May', score: 93 },
  { month: 'Jun', score: 94 },
];

export default function TrustScore() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Trust index</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Trust Score</h1>
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }} className="soft-panel p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Overall score</p>
              <h2 className="mt-2 text-4xl font-bold text-white">94</h2>
            </div>
            <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-emerald-300">High Trust</div>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-[12px] border-cyan-500/20 bg-slate-950/80">
              <div className="absolute inset-3 rounded-full border border-slate-800" />
              <div className="absolute inset-0 rounded-full" style={{ background: 'conic-gradient(#22d3ee 0 94%, rgba(148,163,184,0.14) 94% 100%)' }} />
              <div className="absolute inset-5 flex items-center justify-center rounded-full bg-slate-950">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">94</div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">/100</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Risk level</p>
            <p className="mt-2 text-lg font-semibold text-emerald-300">HIGH TRUST</p>
            <p className="mt-2 text-sm text-slate-400">The system remains resilient due to strong integrity checks, consistent verification outputs, and low incident churn.</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="soft-panel p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Score breakdown</h2>
            <span className="text-sm text-slate-400">Why this score is high</span>
          </div>

          <div className="space-y-4">
            {scoreBreakdown.map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-white">{item.label}</span>
                  <span className="text-cyan-300">{item.value}/100</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500" style={{ width: `${item.value}%` }} />
                </div>
                <p className="mt-2 text-sm text-slate-400">{item.reason}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }} className="soft-panel p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Historical score</h2>
          <span className="text-sm text-emerald-300">+9 pts over 6 months</span>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={scoreTrend}>
              <defs>
                <linearGradient id="trustArea" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.08} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#1e293b" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} domain={[70, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px' }} />
              <Area type="monotone" dataKey="score" stroke="#22d3ee" fill="url(#trustArea)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
