import { motion } from 'framer-motion';
import { AlertTriangle, Bot, Clock3, Cpu, Download, FileCode2, ShieldCheck, ShieldX, UploadCloud, UserRound } from 'lucide-react';
import { useRef, useState } from 'react';
import HashComparison from '../components/common/HashComparison';
import StatusBadge from '../components/common/StatusBadge';

const modelRecord = {
  name: 'VisionTransformer-XL',
  version: 'v2.4.1',
  type: 'Transformer',
  size: '612 MB',
  registeredHash: 'a91b7d49d78ae85b22d1952d029eb8fa31d3d3dc04a82a93e3a50186b0e7fbc1',
  currentHash: 'a91b7d49d78ae85b22d1952d029eb8fa31d3d3dc04a82a93e3a50186b0e7fbc1',
  contributor: 'Model Governance Unit',
  status: 'VERIFIED',
  security: 'No anomalies detected',
  file: 'vision_transformer_xl_v2_4_1.bin',
  lastUpdated: '2026-09-10 08:14 UTC',
};

const modelHistory = [
  { version: 'v2.4.1', status: 'Verified', note: 'Production model approved' },
  { version: 'v2.4.0', status: 'Quarantined', note: 'Checksum mismatch flagged' },
  { version: 'v2.3.8', status: 'Verified', note: 'Stable performance baseline' },
];

export default function ModelIntegrity() {
  const inputRef = useRef(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileName = file.name || 'model_upload.bin';
    const isTampered = /modified|tampered|edited|changed|temp/i.test(fileName);

    setUploadedFileName(fileName);
    setUploadMessage(isTampered ? 'Tampered photo detected' : 'Upload successful');
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Model assurance</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Model Integrity</h1>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }} className="soft-panel p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Upload model image</h2>
          <StatusBadge status={uploadMessage === 'Upload successful' ? 'VERIFIED' : 'TAMPERED'} compact />
        </div>

        <div className="mt-5 rounded-3xl border-2 border-dashed border-cyan-500/30 bg-slate-950/50 p-6 text-center">
          <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleFileUpload} />
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-300">
            <UploadCloud size={28} />
          </div>
          <p className="mt-4 text-base font-medium text-white">Upload a photo for verification</p>
          <p className="mt-2 text-sm text-slate-400">PNG, JPG, TIFF up to 25 MB</p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-sm font-medium text-cyan-200"
          >
            Choose file
          </button>
        </div>

        {uploadMessage && (
          <div className={`mt-5 rounded-2xl border p-3 text-sm ${uploadMessage === 'Upload successful' ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-200' : 'border-rose-500/20 bg-rose-500/5 text-rose-200'}`}>
            {uploadMessage}
          </div>
        )}

        {uploadedFileName && (
          <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300">
            <span className="text-slate-400">Uploaded file:</span> {uploadedFileName}
          </div>
        )}
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }} className="soft-panel p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Model record</h2>
            <StatusBadge status={modelRecord.status} />
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <FileCode2 size={16} className="text-cyan-300" />
                <span>Model name</span>
              </div>
              <p className="mt-3 text-lg font-semibold text-white">{modelRecord.name}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <Cpu size={16} className="text-violet-300" />
                <span>Model type</span>
              </div>
              <p className="mt-3 text-lg font-semibold text-white">{modelRecord.type}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <Bot size={16} className="text-emerald-300" />
                <span>Version</span>
              </div>
              <p className="mt-3 text-lg font-semibold text-white">{modelRecord.version}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <Download size={16} className="text-amber-300" />
                <span>File size</span>
              </div>
              <p className="mt-3 text-lg font-semibold text-white">{modelRecord.size}</p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">File</span>
              <span className="text-white">{modelRecord.file}</span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="soft-panel p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Security status</h2>
            <ShieldCheck className="text-cyan-300" size={18} />
          </div>

          <div className="mt-5 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-emerald-300" size={20} />
              <div>
                <p className="text-lg font-semibold text-white">VERIFIED</p>
                <p className="text-sm text-emerald-200">{modelRecord.security}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-4 text-sm">
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
              <span className="text-slate-400">Current hash</span>
              <span className="max-w-[220px] break-all font-mono text-cyan-300">{modelRecord.currentHash}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
              <span className="text-slate-400">Registered hash</span>
              <span className="max-w-[220px] break-all font-mono text-emerald-300">{modelRecord.registeredHash}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
              <span className="text-slate-400">Contributor</span>
              <span className="text-white">{modelRecord.contributor}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
              <span className="text-slate-400">Last updated</span>
              <span className="text-white">{modelRecord.lastUpdated}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }} className="soft-panel p-6">
        <HashComparison registeredHash={modelRecord.registeredHash} currentHash={modelRecord.currentHash} difference="MATCHED" />
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} className="soft-panel p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Verification result</h2>
            <ShieldCheck className="text-emerald-300" size={18} />
          </div>

          <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Integrity verdict</span>
              <StatusBadge status={modelRecord.status} compact />
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
              <span>Hash validation</span>
              <span className="font-semibold text-emerald-300">MATCHED</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
              <span>Contributor approval</span>
              <span className="font-semibold text-cyan-300">APPROVED</span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.25 }} className="soft-panel p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Model version history</h2>
            <Clock3 className="text-violet-300" size={18} />
          </div>

          <div className="mt-5 space-y-4">
            {modelHistory.map((entry) => (
              <div key={entry.version} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">{entry.version}</span>
                  <StatusBadge status={entry.status === 'Verified' ? 'VERIFIED' : 'QUARANTINED'} compact />
                </div>
                <p className="mt-2 text-sm text-slate-400">{entry.note}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
