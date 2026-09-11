import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowDown,
  Camera,
  CheckCircle2,
  Cpu,
  FileImage,
  ShieldCheck,
  ShieldX,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import SectionHeader from '../components/common/SectionHeader';

const predictionData = [
  { name: 'Vehicle', value: 88 },
  { name: 'Person', value: 72 },
  { name: 'Road sign', value: 63 },
];

const confidenceData = [
  { name: 'Vehicle', confidence: 92 },
  { name: 'Pedestrian', confidence: 81 },
  { name: 'Road sign', confidence: 68 },
  { name: 'Traffic light', confidence: 54 },
];

const chain = [
  { label: 'Image Integrity', state: 'Verified', ok: true },
  { label: 'Model Integrity', state: 'Verified', ok: true },
  { label: 'AI Inference', state: 'Verified', ok: true },
  { label: 'Prediction Verification', state: 'Verified', ok: true },
  { label: 'Trustworthy Result', state: 'Accepted', ok: true },
];

const compromisedChain = [
  { label: 'Image Integrity', state: 'Failed', ok: false },
  { label: 'Inference', state: 'Blocked', ok: false },
  { label: 'Security Incident', state: 'Raised', ok: false },
  { label: 'Quarantine', state: 'Required', ok: false },
];

const pieData = [
  { name: 'Trust', value: 74, color: '#22d3ee' },
  { name: 'Risk', value: 26, color: '#f87171' },
];

export default function PredictionVerification() {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState('');
  const [imageName, setImageName] = useState('traffic_scene_1049.jpg');
  const [imageMeta, setImageMeta] = useState({
    width: '1920 × 1080',
    hash: '2c9e49ff...d7c2f1',
    expectedHash: 'ABC123',
    actualHash: 'ABC123',
    integrity: 'VERIFIED',
    action: 'VERIFIED',
  });

  useEffect(() => {
    return () => {
      if (imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    const fileName = (file.name || 'captured_image.jpg').toLowerCase();
    const isTampered = /modified|tampered|edited|changed|fake|altered|copy/i.test(fileName);
    const expectedHash = 'ABC123';
    const actualHash = isTampered ? 'XYZ789' : 'ABC123';

    setImagePreview(previewUrl);
    setImageName(file.name || 'captured_image.jpg');

    const img = new Image();
    img.onload = () => {
      setImageMeta({
        width: `${img.width} × ${img.height}`,
        hash: actualHash,
        expectedHash,
        actualHash,
        integrity: isTampered ? 'TAMPER DETECTED' : 'VERIFIED',
        action: isTampered ? 'BLOCKED' : 'VERIFIED',
      });
    };
    img.src = previewUrl;
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Inference checking</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Prediction Verification</h1>
      </motion.div>

      <div className="grid gap-6 2xl:grid-cols-[0.95fr_1.2fr_1.05fr]">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }} className="soft-panel p-6">
          <SectionHeader eyebrow="Source asset" title="Image selection" />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            hidden
            onChange={handleFileChange}
          />

          <div className="rounded-3xl border border-dashed border-cyan-500/30 bg-slate-950/60 p-4">
            <div className="flex h-52 items-center justify-center overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950">
              {imagePreview ? (
                <img src={imagePreview} alt={imageName} className="h-full w-full object-cover" />
              ) : (
                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-300">
                    <FileImage size={28} />
                  </div>
                  <p className="mt-4 text-base font-medium text-white">traffic_scene_1049.jpg</p>
                  <p className="mt-1 text-xs text-slate-400">Camera capture • 1920 × 1080</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm font-medium text-cyan-200"
            >
              <Camera size={16} />
              Capture / Upload
            </button>
          </div>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
              <span className="text-slate-400">Image</span>
              <span className="text-right text-white">{imageName}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
              <span className="text-slate-400">Integrity</span>
              <span className={`inline-flex items-center gap-2 ${imageMeta.integrity === 'VERIFIED' ? 'text-emerald-300' : 'text-rose-300'}`}>
                {imageMeta.integrity === 'VERIFIED' ? <ShieldCheck size={14} /> : <ShieldX size={14} />}
                {imageMeta.integrity}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
              <span className="text-slate-400">Expected Hash</span>
              <span className="font-mono text-xs text-emerald-300">{imageMeta.expectedHash}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
              <span className="text-slate-400">Actual Hash</span>
              <span className="font-mono text-xs text-cyan-300">{imageMeta.actualHash}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
              <span className="text-slate-400">Action</span>
              <span className={imageMeta.action === 'VERIFIED' ? 'text-emerald-300' : 'text-amber-300'}>{imageMeta.action}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
              <span className="text-slate-400">Resolution</span>
              <span className="text-white">{imageMeta.width}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
              <span className="text-slate-400">Verification time</span>
              <span className="text-white">2026-09-10 08:42 UTC</span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="soft-panel p-6">
          <SectionHeader eyebrow="Model session" title="Selected AI model" action={<span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-300">verified</span>} />

          <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Model</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">VisionTransformer-XL</h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
                <Cpu size={22} />
              </div>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between"><span className="text-slate-400">Version</span><span className="text-white">v2.4.1</span></div>
              <div className="flex items-center justify-between"><span className="text-slate-400">Integrity</span><span className="text-emerald-300">MODEL VERIFIED</span></div>
              <div className="flex items-center justify-between"><span className="text-slate-400">Model hash</span><span className="font-mono text-xs text-violet-300">f3a1be91...03ee7d</span></div>
            </div>

            <button
              type="button"
              onClick={() => window.alert('Inference run started successfully. Results are being verified.')}
              className="mt-6 w-full rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20"
            >
              Run Inference
            </button>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-950/60 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Security chain</p>
              <ShieldCheck className="text-emerald-300" size={16} />
            </div>

            <div className="space-y-3">
              {chain.map((item, index) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full ${item.ok ? 'bg-emerald-500/10 text-emerald-300' : 'bg-rose-500/10 text-rose-300'}`}>
                    {item.ok ? <CheckCircle2 size={14} /> : <ShieldX size={14} />}
                  </div>
                  <div className="flex-1 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-200">{item.label}</span>
                      <span className={item.ok ? 'text-emerald-300' : 'text-rose-300'}>{item.state}</span>
                    </div>
                  </div>
                  {index < chain.length - 1 && <ArrowDown size={14} className="text-slate-500" />}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }} className="soft-panel p-6">
          <SectionHeader eyebrow="Inference output" title="Prediction result" action={<span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-300">trustworthy</span>} />

          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Detected objects</p>
                <h3 className="mt-3 text-3xl font-bold text-white">Vehicle</h3>
              </div>
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-300">
                92% confidence
              </div>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                <span className="text-slate-400">Verification status</span>
                <span className="text-emerald-300">VERIFIED</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                <span className="text-slate-400">Trust status</span>
                <span className="text-cyan-300">TRUSTED</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                <span className="text-slate-400">Prediction hash</span>
                <span className="font-mono text-[10px] text-white">b92d...4882f</span>
              </div>
            </div>
          </div>

          <div className="mt-6 h-44 rounded-3xl border border-slate-800 bg-slate-950/60 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={confidenceData}>
                <CartesianGrid stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px' }} />
                <Bar dataKey="confidence" radius={[8, 8, 0, 0]} fill="#22d3ee" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} className="soft-panel p-6">
          <SectionHeader eyebrow="Analysis" title="Prediction details" />

          <div className="space-y-4">
            {predictionData.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-300">{item.name}</span>
                  <span className="font-medium text-white">{item.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.22 }} className="soft-panel p-6">
          <SectionHeader eyebrow="Security layer" title="Integrity snapshot" />

          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={48} outerRadius={70} paddingAngle={2}>
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
              <span className="text-slate-400">Trust score</span>
              <span className="text-cyan-300">74%</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
              <span className="text-slate-400">Risk score</span>
              <span className="text-rose-300">26%</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.25 }} className="soft-panel p-6">
        <SectionHeader eyebrow="Visual trust trail" title="Compromised asset scenario" action={<span className="rounded-full border border-rose-500/30 bg-rose-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-rose-300">blocked</span>} />

        <div className="grid gap-4 lg:grid-cols-4">
          {compromisedChain.map((step, index) => (
            <div key={step.label} className="rounded-3xl border border-slate-800 bg-slate-950/60 p-4 text-center">
              <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full ${step.ok ? 'bg-emerald-500/10 text-emerald-300' : 'bg-rose-500/10 text-rose-300'}`}>
                {step.ok ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
              </div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{step.label}</p>
              <p className={`mt-3 text-sm font-semibold ${step.ok ? 'text-emerald-300' : 'text-rose-300'}`}>{step.state}</p>
              {index < compromisedChain.length - 1 && <div className="mt-4 flex justify-center text-slate-500"><ArrowDown size={16} /></div>}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
