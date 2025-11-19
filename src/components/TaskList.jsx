import { useEffect } from 'react'

export default function TaskList({ tasks, onRefresh }) {
  useEffect(() => {
    // initial load happens in parent
  }, [])

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-700/60 flex items-center justify-between">
        <h3 className="text-white font-semibold">Tasks</h3>
        <button onClick={onRefresh} className="text-sm text-blue-300 hover:text-blue-200">Refresh</button>
      </div>
      <ul className="divide-y divide-slate-700/60">
        {tasks.length === 0 && (
          <li className="px-4 py-6 text-slate-300">No tasks yet. Add one above.</li>
        )}
        {tasks.map(t => (
          <li key={t.id} className="px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-white font-medium">{t.title}</p>
              <p className="text-xs text-slate-400">Priority: {t.priority} • Est: {t.estimate_minutes}m</p>
            </div>
            <span className="text-xs text-slate-400">{t.status}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
