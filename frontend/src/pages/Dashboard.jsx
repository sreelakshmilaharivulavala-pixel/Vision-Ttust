import { motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bell,
  Bot,
  CheckCircle2,
  Cpu,
  Database,
  Gauge,
  ImageIcon,
  Lock,
  ShieldCheck,
  ShieldX,
  Sparkles,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const trustTrend = [
  { name: 'Jan', score: 82 },
  { name: 'Feb', score: 86 },
  { name: 'Mar', score: 88 },
  { name: 'Apr', score: 91 },
  { name: 'May', score: 92 },
  { name: 'Jun', score: 94 },
];

const blockedAssets = [
  { name: 'Tampered images', value: 18 },
  { name: 'Poisoned labels', value: 12 },
  { name: 'IP mismatches', value: 9 },
  { name: 'Unsafe inferences', value: 7 },
];

const integrityOverview = [
  { label: 'Verified Images', value: '8,420', status: 'Healthy', tone: 'cyan' },
  { label: 'Verified Models', value: '142', status: 'Healthy', tone: 'emerald' },
  { label: 'Verified Predictions', value: '3,962', status: 'Monitored', tone: 'violet' },
  { label: 'Tampered Assets', value: '07', status: 'Blocked', tone: 'rose' },
];

const securityThreats = [
  { name: 'Model drift anomaly', severity: 'High', note: 'Vision Transformer classifier drift detected' },
  { name: 'Image metadata mismatch', severity: 'Medium', note: '3 assets failed provenance verification' },
  { name: 'Contributor validation delay', severity: 'Low', note: 'Queued for secondary approval' },
];

const incidents = [
  { title: 'Dataset lineage alert', owner: 'DataOps', time: '02m ago', severity: 'Critical' },
  { title: 'Inference confidence drop', owner: 'Model Guard', time: '17m ago', severity: 'Medium' },
  { title: 'Hash mismatch reviewed', owner: 'Blockchain team', time: '41m ago', severity: 'Low' },
];

const activity = [
  'Dataset integrity review completed for contributor batch D-214.',
  'New model checkpoint signed and published to trust ledger.',
  'Verification pipeline quarantined 2 suspicious predictions.',
  'Security team acknowledged an image provenance mismatch.',
];

const pipelineSteps = [
  'Contributor',
  'Dataset/Image',
  'Model',
  'Integrity Check',
  'AI Inference',
  'Prediction',
  'Verification',
  'Blockchain',
];

const blockchainStatus = [
  { name: 'Ledger sync', state: 'Synced', tone: 'emerald' },
  { name: 'Evidence hashes', state: 'Verified', tone: 'cyan' },
  { name: 'Consensus nodes', state: 'Stable', tone: 'violet' },
  { name: 'Pending attestations', state: '03', tone: 'amber' },
];

export default function Dashboard() {
  const [alertCount, setAlertCount] = useState(4);
  const [pipelineActive, setPipelineActive] = useState(true);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Overview</p>
          <h1 className="mt-2 text-3xl font-bold text-white">VisionTrust Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setAlertCount((count) => (count > 0 ? count - 1 : 0))}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-300"
          >
            <Bell size={16} />
            {alertCount} alerts
          </button>
          <button
            type="button"
            onClick={() => setPipelineActive((value) => !value)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-950 shadow-lg ${
              pipelineActive ? 'bg-cyan-500 shadow-cyan-500/20' : 'bg-slate-300 shadow-slate-500/20'
            }`}
          >
            <Activity size={16} />
            {pipelineActive ? 'Active pipeline' : 'Pipeline paused'}
          </button>
        </div>
      </motion.div>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="soft-panel overflow-hidden p-6"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 ring-1 ring-cyan-500/30">
                <ShieldCheck className="text-cyan-300" size={28} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Trust score</p>
                <div className="mt-1 flex items-end gap-2">
                  <span className="text-5xl font-bold text-white">94</span>
                  <span className="pb-2 text-lg text-slate-400">/ 100</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
              HIGH TRUST
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {integrityOverview.map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">{item.label}</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-2xl font-bold text-white">{item.value}</span>
                  <span className={`rounded-full px-2 py-1 text-[10px] font-medium ${
                    item.tone === 'cyan' ? 'bg-cyan-500/10 text-cyan-300' :
                    item.tone === 'emerald' ? 'bg-emerald-500/10 text-emerald-300' :
                    item.tone === 'violet' ? 'bg-violet-500/10 text-violet-300' :
                    'bg-rose-500/10 text-rose-300'
                  }`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="soft-panel p-6"
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Security overview</h2>
            <span className="rounded-full bg-rose-500/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-rose-300">Live</span>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Active Threats</span>
                <span className="text-2xl font-bold text-white">07</span>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Critical Incidents</span>
                <span className="text-2xl font-bold text-white">03</span>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Blocked Assets</span>
                <span className="text-2xl font-bold text-white">19</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.12 }}
          className="soft-panel p-6"
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Trust trend</h2>
            <span className="inline-flex items-center gap-2 text-sm text-emerald-300">
              <Sparkles size={16} />
              +4.2% this quarter
            </span>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trustTrend}>
                <defs>
                  <linearGradient id="trustFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.08} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} domain={[70, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="score" stroke="#22d3ee" fill="url(#trustFill)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="soft-panel p-6"
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Threat map</h2>
            <ShieldX className="text-rose-300" size={18} />
          </div>

          <div className="space-y-4">
            {securityThreats.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-white">{item.name}</span>
                  <span className={`rounded-full px-2 py-1 text-[10px] font-medium ${
                    item.severity === 'High' ? 'bg-rose-500/10 text-rose-300' :
                    item.severity === 'Medium' ? 'bg-amber-500/10 text-amber-300' :
                    'bg-cyan-500/10 text-cyan-300'
                  }`}>{item.severity}</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{item.note}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.18 }} className="soft-panel p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Integrity overview</h2>
            <Database className="text-cyan-300" size={18} />
          </div>

          <div className="space-y-4">
            {[
              { label: 'Verified Images', value: '8,420', status: 'Healthy' },
              { label: 'Verified Models', value: '142', status: 'Healthy' },
              { label: 'Verified Predictions', value: '3,962', status: 'Monitored' },
              { label: 'Tampered Assets', value: '07', status: 'Blocked' },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/50 p-3">
                <div>
                  <p className="text-sm text-slate-300">{row.label}</p>
                  <p className="mt-1 text-xl font-bold text-white">{row.value}</p>
                </div>
                <span className={`rounded-full px-2 py-1 text-[10px] ${
                  row.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-300' :
                  row.status === 'Blocked' ? 'bg-rose-500/10 text-rose-300' :
                  'bg-violet-500/10 text-violet-300'
                }`}>{row.status}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.2 }} className="soft-panel p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Active incidents</h2>
            <AlertTriangle className="text-amber-300" size={18} />
          </div>

          <div className="space-y-3">
            {incidents.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-white">{item.title}</p>
                  <span className={`rounded-full px-2 py-1 text-[10px] ${
                    item.severity === 'Critical' ? 'bg-rose-500/10 text-rose-300' :
                    item.severity === 'Medium' ? 'bg-amber-500/10 text-amber-300' :
                    'bg-emerald-500/10 text-emerald-300'
                  }`}>{item.severity}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                  <span>{item.owner}</span>
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.22 }} className="soft-panel p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Blocked assets</h2>
            <Lock className="text-rose-300" size={18} />
          </div>

          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={blockedAssets} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} width={110} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px' }}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} fill="#22d3ee" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.25 }} className="soft-panel p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Recent activity</h2>
            <Activity className="text-cyan-300" size={18} />
          </div>

          <div className="space-y-4">
            {activity.map((item, index) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/50 p-3">
                <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-300">
                  <CheckCircle2 size={14} />
                </div>
                <p className="text-sm text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.28 }} className="soft-panel p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Pipeline status</h2>
            <Cpu className="text-violet-300" size={18} />
          </div>

          <div className="flex flex-wrap gap-2">
            {pipelineSteps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`rounded-full border px-3 py-2 text-xs font-medium ${
                  index === 3 || index === 6 ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-200' :
                  'border-slate-700 bg-slate-950/70 text-slate-200'
                }`}>
                  {step}
                </div>
                {index < pipelineSteps.length - 1 && <ArrowRight className="mx-1 text-slate-500" size={14} />}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.3 }} className="soft-panel p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Blockchain status</h2>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs uppercase tracking-[0.22em] text-emerald-300">
            <Bot size={14} />
            On-chain
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {blockchainStatus.map((item) => (
            <div key={item.name} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{item.name}</p>
                <Gauge className="text-cyan-300" size={16} />
              </div>
              <p className={`mt-4 text-lg font-semibold ${
                item.tone === 'emerald' ? 'text-emerald-300' :
                item.tone === 'cyan' ? 'text-cyan-300' :
                item.tone === 'violet' ? 'text-violet-300' :
                'text-amber-300'
              }`}>{item.state}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
