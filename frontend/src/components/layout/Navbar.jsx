import { Bell, Search, Settings } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const searchCatalog = [
  { label: 'Dashboard', path: '/' },
  { label: 'Image Integrity', path: '/image-integrity' },
  { label: 'Model Integrity', path: '/model-integrity' },
  { label: 'Prediction Verification', path: '/prediction-verification' },
  { label: 'Contributors', path: '/contributors' },
  { label: 'Blockchain Evidence', path: '/blockchain-evidence' },
  { label: 'Trust Score', path: '/trust-score' },
  { label: 'Impact Finder', path: '/impact-finder' },
  { label: 'Incident Center', path: '/incident-center' },
  { label: 'Visual Pipeline', path: '/visual-pipeline' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { user, themeMode, setThemeMode } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [auditSynced, setAuditSynced] = useState(true);

  const filteredResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return searchCatalog.filter(({ label, path }) =>
      label.toLowerCase().includes(query) || path.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const notifications = [
    'Dataset integrity review completed',
    'New contributor model hash verified',
    'Incident center updated 3 minutes ago',
  ];

  const handleSearchSelect = (path) => {
    navigate(path);
    setSearchQuery('');
  };

  return (
    <header className="relative flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/80 px-6 backdrop-blur">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search evidence, models, incidents..."
            className="w-80 rounded-xl border border-slate-700 bg-slate-900/80 py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
            aria-label="Global search"
          />

          {searchQuery && (
            <div className="absolute left-0 top-12 z-20 w-80 rounded-2xl border border-slate-700 bg-slate-900/95 p-2 shadow-2xl shadow-slate-950/60">
              {filteredResults.length > 0 ? (
                <div className="space-y-1">
                  {filteredResults.slice(0, 6).map(({ label, path }) => (
                    <button
                      key={path}
                      type="button"
                      onClick={() => handleSearchSelect(path)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-slate-200 transition hover:bg-slate-800 hover:text-white"
                    >
                      <span>{label}</span>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Open</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="px-3 py-2 text-sm text-slate-400">No matches found</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifications((value) => !value);
              setShowSettings(false);
            }}
            className="rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-slate-300 transition hover:text-white"
            aria-label="Notifications"
          >
            <Bell size={18} />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-14 w-72 rounded-2xl border border-slate-700 bg-slate-900/95 p-3 shadow-2xl shadow-slate-950/50">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">Notifications</p>
              <div className="space-y-2">
                {notifications.map((item) => (
                  <div key={item} className="rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowSettings((value) => !value);
              setShowNotifications(false);
            }}
            className="rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-slate-300 transition hover:text-white"
            aria-label="Settings"
          >
            <Settings size={18} />
          </button>

          {showSettings && (
            <div className="absolute right-0 top-14 w-72 rounded-2xl border border-slate-700 bg-slate-900/95 p-4 shadow-2xl shadow-slate-950/50">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Settings</p>
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-slate-300"
                >
                  Close
                </button>
              </div>

              <div className="space-y-3 text-sm text-slate-200">
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2.5">
                  <span>Theme</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setThemeMode('light')}
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em] ${
                        themeMode === 'light'
                          ? 'border-amber-400 bg-amber-400/15 text-amber-300'
                          : 'border-slate-700 bg-slate-800 text-slate-300'
                      }`}
                    >
                      Light
                    </button>
                    <button
                      type="button"
                      onClick={() => setThemeMode('dark')}
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em] ${
                        themeMode === 'dark'
                          ? 'border-cyan-400 bg-cyan-500/15 text-cyan-300'
                          : 'border-slate-700 bg-slate-800 text-slate-300'
                      }`}
                    >
                      Dark
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2.5">
                  <span>Alerts</span>
                  <button
                    type="button"
                    onClick={() => setAlertsEnabled((value) => !value)}
                    className={`flex h-6 w-11 items-center rounded-full p-1 transition ${alertsEnabled ? 'bg-cyan-500' : 'bg-slate-700'}`}
                    aria-label="Toggle alerts"
                  >
                    <span className={`h-4 w-4 rounded-full bg-white transition ${alertsEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2.5">
                  <span>Audit log</span>
                  <button
                    type="button"
                    onClick={() => setAuditSynced((value) => !value)}
                    className={`flex h-6 w-11 items-center rounded-full p-1 transition ${auditSynced ? 'bg-emerald-500' : 'bg-slate-700'}`}
                    aria-label="Toggle audit sync"
                  >
                    <span className={`h-4 w-4 rounded-full bg-white transition ${auditSynced ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 font-semibold text-white">
            {user?.name?.split(' ').map((part) => part[0]).slice(0, 2).join('') || 'VT'}
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-white">{user?.name}</div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{user?.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
