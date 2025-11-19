import { useState } from 'react'

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [estimate, setEstimate] = useState(30)

  const submit = (e) => {
    e.preventDefault()
    onAdd({ title, priority, estimate_minutes: Number(estimate) })
    setTitle('')
    setPriority('medium')
    setEstimate(30)
  }

  return (
    <form onSubmit={submit} className="flex flex-col md:flex-row gap-3">
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Task title" required className="flex-1 px-3 py-2 rounded bg-slate-800/60 border border-slate-700 text-white placeholder:text-slate-400" />
      <select value={priority} onChange={e=>setPriority(e.target.value)} className="px-3 py-2 rounded bg-slate-800/60 border border-slate-700 text-white">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>
      <input type="number" min="5" max="240" value={estimate} onChange={e=>setEstimate(e.target.value)} className="w-24 px-3 py-2 rounded bg-slate-800/60 border border-slate-700 text-white" />
      <button type="submit" className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold">Add</button>
    </form>
  )
}
