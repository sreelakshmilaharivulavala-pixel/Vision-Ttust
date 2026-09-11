export default function ContributorTable({ contributors, selectedId, onSelect }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-950/70 text-slate-400">
            <tr>
              <th className="px-4 py-3 font-medium">Contributor</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Images</th>
              <th className="px-4 py-3 font-medium">Models</th>
              <th className="px-4 py-3 font-medium">Predictions</th>
              <th className="px-4 py-3 font-medium">Trust</th>
              <th className="px-4 py-3 font-medium">Failures</th>
              <th className="px-4 py-3 font-medium">Incidents</th>
            </tr>
          </thead>
          <tbody>
            {contributors.map((person) => (
              <tr
                key={person.id}
                onClick={() => onSelect(person.id)}
                className={`cursor-pointer border-t border-slate-800 transition ${selectedId === person.id ? 'bg-cyan-500/5' : 'hover:bg-slate-800/40'}`}
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 font-semibold text-white">
                      {person.name.split(' ').map((part) => part[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-white">{person.name}</div>
                      <div className="text-xs text-slate-400">{person.role}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.18em] ${person.status === 'Active' ? 'bg-emerald-500/10 text-emerald-300' : person.status === 'Review' ? 'bg-amber-500/10 text-amber-300' : 'bg-rose-500/10 text-rose-300'}`}>
                    {person.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-300">{person.images}</td>
                <td className="px-4 py-4 text-slate-300">{person.models}</td>
                <td className="px-4 py-4 text-slate-300">{person.predictions}</td>
                <td className="px-4 py-4 text-slate-300">{person.trustScore}</td>
                <td className="px-4 py-4 text-slate-300">{person.integrityFailures}</td>
                <td className="px-4 py-4 text-slate-300">{person.incidents}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
