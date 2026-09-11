import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Clock3, Download, FileImage, ShieldCheck, ShieldX, UploadCloud, UserRound } from 'lucide-react';
import { useRef, useState } from 'react';
import HashComparison from '../components/common/HashComparison';
import StatusBadge from '../components/common/StatusBadge';

const defaultImageMeta = {
  filename: 'car.jpg',
  type: 'image/jpeg',
  size: '2.4 MB',
  dimensions: '1200 × 900',
  registeredHash: 'ABC123456',
  currentHash: 'ABC123456',
  timestamp: '2026-09-10 09:42 UTC',
  contributor: 'VisionTrust',
  status: 'VERIFIED',
  securityAction: 'VERIFIED',
  difference: '0.00%',
  previewUrl: '',
  uploadMessage: '',
  verificationSource: 'Integrity Service',
};

const verificationHistory = [
  { type: 'Registered', time: '08:15 UTC', actor: 'VisionTrust Registry' },
  { type: 'Verified', time: '09:10 UTC', actor: 'Integrity Service' },
  { type: 'Hash match', time: '09:42 UTC', actor: 'Image Sensor Watch' },
];

export default function ImageIntegrity() {
  const inputRef = useRef(null);
  const [imageMeta, setImageMeta] = useState(defaultImageMeta);

  const isVerified = imageMeta.status === 'VERIFIED';

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const nextName = file.name || defaultImageMeta.filename;
    const nextType = file.type || 'image/file';
    const nextSize = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
    const previewUrl = URL.createObjectURL(file);
    const isTampered = /modified|tampered|edited|changed|temp/i.test(nextName);
    const registeredHash = 'ABC123';
    const currentHash = isTampered ? 'XYZ789' : 'ABC123';

    const img = new Image();
    img.onload = () => {
      const alertTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' }) + ' UTC';
      const verificationSource = isTampered ? 'Image Sensor Watch' : 'Integrity Service';

      setImageMeta({
        filename: nextName,
        type: nextType,
        size: nextSize,
        dimensions: `${img.width} × ${img.height}`,
        registeredHash,
        currentHash,
        timestamp: alertTime,
        contributor: isTampered ? 'Modified upload by local user' : 'Original upload by VisionTrust',
        status: isTampered ? 'TAMPERED' : 'VERIFIED',
        securityAction: isTampered ? 'BLOCKED' : 'VERIFIED',
        difference: isTampered ? 'Mismatch detected' : '0.00%',
        previewUrl,
        uploadMessage: isTampered ? 'Tampered photo detected' : 'Upload successful',
        verificationSource,
      });
    };
    img.src = previewUrl;
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Vision verification</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Image Integrity</h1>
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }} className="soft-panel p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Evidence upload</h2>
            <StatusBadge status={imageMeta.status} />
          </div>

          <div className="mt-5 rounded-3xl border-2 border-dashed border-cyan-500/30 bg-slate-950/50 p-6 text-center">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-300">
              <UploadCloud size={28} />
            </div>
            <p className="mt-4 text-base font-medium text-white">Drag and drop image</p>
            <p className="mt-2 text-sm text-slate-400">PNG, JPG, TIFF up to 25 MB</p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-sm font-medium text-cyan-200"
            >
              Choose file
            </button>
          </div>

          {imageMeta.uploadMessage && (
            <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-sm text-emerald-200">
              {imageMeta.uploadMessage}
            </div>
          )}

          <div className="mt-5 grid gap-4 md:grid-cols-[180px_1fr]">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
              <div className="flex h-full items-center justify-center overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 p-2">
                {imageMeta.previewUrl ? (
                  <img src={imageMeta.previewUrl} alt={imageMeta.filename} className="h-full w-full rounded-xl object-cover" />
                ) : (
                  <FileImage className="text-slate-400" size={48} />
                )}
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">File</span>
                <span className="text-white">{imageMeta.filename}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Type</span>
                <span className="text-white">{imageMeta.type}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Size</span>
                <span className="text-white">{imageMeta.size}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Dimensions</span>
                <span className="text-white">{imageMeta.dimensions}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="soft-panel p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Verification status</h2>
            <div className={`flex items-center gap-2 rounded-full border px-2 py-1 text-xs uppercase tracking-[0.2em] ${isVerified ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-rose-500/30 bg-rose-500/10 text-rose-300'}`}>
              {isVerified ? <ShieldCheck size={12} /> : <ShieldX size={12} />}
              {imageMeta.securityAction}
            </div>
          </div>

          <div className={`mt-5 rounded-3xl border p-4 ${isVerified ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-rose-500/20 bg-rose-500/5'}`}>
            <div className="flex items-center gap-3">
              {isVerified ? <CheckCircle2 className="text-emerald-300" size={20} /> : <AlertTriangle className="text-rose-300" size={20} />}
              <div>
                <p className="text-lg font-semibold text-white">{isVerified ? '✓ VERIFIED' : '⚠ TAMPER DETECTED'}</p>
                <p className={`text-sm ${isVerified ? 'text-emerald-200' : 'text-rose-200'}`}>
                  {isVerified ? 'Image hash matches the registered data.' : 'Hash mismatch detected'}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                  {imageMeta.verificationSource} • {imageMeta.timestamp}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-4 text-sm">
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
              <span className="text-slate-400">Registered hash</span>
              <span className="max-w-[220px] break-all text-right font-mono text-emerald-300">{imageMeta.registeredHash}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
              <span className="text-slate-400">Current hash</span>
              <span className="max-w-[220px] break-all text-right font-mono text-cyan-300">{imageMeta.currentHash}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
              <span className="text-slate-400">Difference</span>
              <span className="font-semibold text-white">{imageMeta.difference}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
              <span className="text-slate-400">Security action</span>
              <span className={isVerified ? 'text-emerald-300' : 'text-amber-300'}>{imageMeta.securityAction}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }} className="soft-panel p-6">
        <HashComparison registeredHash={imageMeta.registeredHash} currentHash={imageMeta.currentHash} difference={imageMeta.difference} />
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} className="soft-panel p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Verification details</h2>
            <ShieldCheck className="text-cyan-300" size={18} />
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <CheckCircle2 size={16} className="text-emerald-300" />
                <span>Verification status</span>
              </div>
              <p className="mt-3 text-2xl font-bold text-white">{imageMeta.status}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <Clock3 size={16} className="text-cyan-300" />
                <span>Verification timestamp</span>
              </div>
              <p className="mt-3 text-sm font-medium text-white">{imageMeta.timestamp}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <UserRound size={16} className="text-violet-300" />
                <span>Contributor</span>
              </div>
              <p className="mt-3 text-sm font-medium text-white">{imageMeta.contributor}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <Download size={16} className="text-amber-300" />
                <span>Verified state</span>
              </div>
              <p className="mt-3 text-lg font-semibold text-white">✓ VERIFIED</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.25 }} className="soft-panel p-6">
          <h2 className="text-lg font-semibold text-white">Verification history</h2>

          <div className="mt-5 space-y-4">
            {verificationHistory.map((entry) => (
              <div key={entry.time} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{entry.type}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{entry.time}</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{entry.actor}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }} className="soft-panel p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Your Photo</h2>
          <StatusBadge status={imageMeta.status} compact />
        </div>

        <div className="mt-5 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="mx-auto flex h-60 max-w-md items-center justify-center overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/80">
            {imageMeta.previewUrl ? (
              <img src={imageMeta.previewUrl} alt={imageMeta.filename} className="h-full w-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
                <FileImage size={42} />
                <span className="text-sm uppercase tracking-[0.2em]">Your Photo</span>
              </div>
            )}
          </div>

          <div className="mt-5 space-y-3 text-sm text-slate-200">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">File:</span>
              <span className="text-right font-medium text-white">{imageMeta.filename}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Expected Hash:</span>
              <span className="text-right font-mono text-emerald-300">{imageMeta.registeredHash}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Actual Hash:</span>
              <span className="text-right font-mono text-cyan-300">{imageMeta.currentHash}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Status:</span>
              <span className={`text-right font-semibold ${isVerified ? 'text-emerald-300' : 'text-rose-300'}`}>
                {isVerified ? '✓ VERIFIED' : '⚠ TAMPER DETECTED'}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Action:</span>
              <span className={`text-right font-semibold ${isVerified ? 'text-emerald-300' : 'text-amber-300'}`}>
                {isVerified ? 'VERIFIED' : 'BLOCKED'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
