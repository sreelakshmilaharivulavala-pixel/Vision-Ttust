import { LayoutDashboard, ShieldCheck, BrainCircuit, CheckCircle2, Users, Link2, Star, AlertTriangle, Activity, GitBranch, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Image Integrity', icon: ShieldCheck, path: '/image-integrity' },
  { label: 'Model Integrity', icon: BrainCircuit, path: '/model-integrity' },
  { label: 'Prediction Verification', icon: CheckCircle2, path: '/prediction-verification' },
  { label: 'Contributors', icon: Users, path: '/contributors' },
  { label: 'Blockchain Evidence', icon: Link2, path: '/blockchain-evidence' },
  { label: 'Trust Score', icon: Star, path: '/trust-score' },
  { label: 'Impact Finder', icon: Activity, path: '/impact-finder' },
  { label: 'Incident Center', icon: AlertTriangle, path: '/incident-center' },
  { label: 'Visual Pipeline', icon: GitBranch, path: '/visual-pipeline' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSignOut = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950/90 px-4 py-6 backdrop-blur">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-500/30">
          <ShieldCheck size={20} />
        </div>
        <div>
          <div className="text-lg font-semibold text-white">VisionTrust</div>
          <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Integrity Layer</div>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-200 ring-1 ring-cyan-500/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Icon size={16} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={handleSignOut}
        className="mt-6 flex items-center gap-3 rounded-xl border border-slate-800 px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
      >
        <LogOut size={16} />
        Sign out
      </button>
    </aside>
  );
}
