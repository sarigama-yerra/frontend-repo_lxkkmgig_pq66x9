import { useEffect, useState } from 'react'

export default function Recommendations({ baseUrl }) {
  const [recs, setRecs] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchRecs = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/recommend`)
      const data = await res.json()
      setRecs(data.suggestions || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecs()
  }, [])

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-700/60 flex items-center justify-between">
        <h3 className="text-white font-semibold">What should I do next?</h3>
        <button onClick={fetchRecs} className="text-sm text-blue-300 hover:text-blue-200">Refresh</button>
      </div>
      <ul className="divide-y divide-slate-700/60">
        {loading && <li className="px-4 py-6 text-slate-300">Loading...</li>}
        {!loading && recs.length === 0 && <li className="px-4 py-6 text-slate-300">No suggestions yet.</li>}
        {!loading && recs.map((r, idx) => (
          <li key={idx} className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{r.task?.title}</p>
                <p className="text-xs text-slate-400">Priority: {r.task?.priority} • Est: {r.task?.estimate_minutes}m</p>
              </div>
              <span className="text-xs text-blue-300">Score: {r.score}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
