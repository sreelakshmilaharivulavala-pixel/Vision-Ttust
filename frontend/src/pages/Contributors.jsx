import { useMemo, useState } from 'react';
import { Search, ShieldCheck } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ContributorTable from '../components/common/ContributorTable';

const contributors = [
  {
    id: 1,
    name: 'Ava Chen',
    role: 'Data annotator',
    status: 'Active',
    images: 320,
    models: 6,
    predictions: 1200,
    trustScore: 96,
    integrityFailures: 1,
    incidents: 0,
    scoreHistory: [88, 89, 91, 93, 95, 96],
    profile: {
      images: '320 labeled images',
      models: '6 reviewed model batches',
      predictions: '1,200 accepted predictions',
      integrityEvents: '2 minor review events',
      incidents: 'No severe incidents',
      trustScore: '96/100',
    },
  },
  {
    id: 2,
    name: 'Milo Patel',
    role: 'Model reviewer',
    status: 'Review',
    images: 224,
    models: 9,
    predictions: 980,
    trustScore: 91,
    integrityFailures: 2,
    incidents: 1,
    scoreHistory: [79, 81, 84, 87, 89, 91],
    profile: {
      images: '224 curated images',
      models: '9 validator runs',
      predictions: '980 checked predictions',
      integrityEvents: '3 review escalations',
      incidents: '1 minor model review warning',
      trustScore: '91/100',
    },
  },
  {
    id: 3,
    name: 'Sara Iqbal',
    role: 'Integrity auditor',
    status: 'Active',
    images: 416,
    models: 11,
    predictions: 1540,
    trustScore: 98,
    integrityFailures: 0,
    incidents: 0,
    scoreHistory: [90, 92, 94, 96, 97, 98],
    profile: {
      images: '416 integrity scans',
      models: '11 model audits',
      predictions: '1,540 verified outputs',
      integrityEvents: 'No integrity failures',
      incidents: 'No active incidents',
      trustScore: '98/100',
    },
  },
  {
    id: 4,
    name: 'Nora Singh',
    role: 'Pipeline owner',
    status: 'Paused',
    images: 190,
    models: 5,
    predictions: 610,
    trustScore: 84,
    integrityFailures: 3,
    incidents: 2,
    scoreHistory: [77, 79, 81, 83, 84, 84],
    profile: {
      images: '190 submissions pending review',
      models: '5 models under audit',
      predictions: '610 outputs flagged',
      integrityEvents: '3 validation mismatches',
      incidents: '2 pipeline alerts',
      trustScore: '84/100',
    },
  },
];

export default function Contributors() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedId, setSelectedId] = useState(1);

  const filtered = useMemo(() => {
    return contributors.filter((person) => {
      const matchesSearch = person.name.toLowerCase().includes(search.toLowerCase()) || person.role.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || person.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const selectedContributor = filtered.find((person) => person.id === selectedId) || contributors[0];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Contributor ledger</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Contributors</h1>
      </div>

      <div className="soft-panel p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contributor"
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 py-2.5 pl-10 pr-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-slate-400">Filter</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none"
            >
              <option>All</option>
              <option>Active</option>
              <option>Review</option>
              <option>Paused</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6 2xl:grid-cols-[1.5fr_0.8fr]">
        <div className="soft-panel p-4">
          <ContributorTable contributors={filtered} selectedId={selectedContributor.id} onSelect={setSelectedId} />
        </div>

        <div className="soft-panel p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-300">Selected profile</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{selectedContributor.name}</h2>
            </div>
            <div className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.21em] ${selectedContributor.status === 'Active' ? 'bg-emerald-500/10 text-emerald-300' : selectedContributor.status === 'Review' ? 'bg-amber-500/10 text-amber-300' : 'bg-rose-500/10 text-rose-300'}`}>
              {selectedContributor.status}
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-950/60 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 font-semibold text-white">
                {selectedContributor.name.split(' ').map((part) => part[0]).join('')}
              </div>
              <div>
                <p className="font-medium text-white">{selectedContributor.role}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Contributor</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-3"><span className="text-slate-400">Images</span><span className="text-white">{selectedContributor.profile.images}</span></div>
              <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-3"><span className="text-slate-400">Models</span><span className="text-white">{selectedContributor.profile.models}</span></div>
              <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-3"><span className="text-slate-400">Predictions</span><span className="text-white">{selectedContributor.profile.predictions}</span></div>
              <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-3"><span className="text-slate-400">Integrity events</span><span className="text-white">{selectedContributor.profile.integrityEvents}</span></div>
              <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-3"><span className="text-slate-400">Incidents</span><span className="text-white">{selectedContributor.profile.incidents}</span></div>
              <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-3"><span className="text-slate-400">Trust score</span><span className="text-cyan-300">{selectedContributor.profile.trustScore}</span></div>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-slate-300">Trust trajectory</p>
              <ShieldCheck className="text-emerald-300" size={16} />
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={selectedContributor.scoreHistory.map((value, index) => ({ month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index], score: value }))}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.08} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} domain={[70, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px' }} />
                  <Area type="monotone" dataKey="score" stroke="#22d3ee" fill="url(#scoreGradient)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
