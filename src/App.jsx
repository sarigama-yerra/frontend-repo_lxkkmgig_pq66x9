import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Recommendations from './components/Recommendations'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [creating, setCreating] = useState(false)

  const loadTasks = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/tasks`)
      const data = await res.json()
      setTasks(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (task) => {
    setCreating(true)
    try {
      await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      })
      await loadTasks()
    } catch (e) {
      console.error(e)
    } finally {
      setCreating(false)
    }
  }

  const createSample = async () => {
    const samples = [
      { title: 'Draft project outline', priority: 'high', estimate_minutes: 60 },
      { title: 'Inbox zero sprint', priority: 'medium', estimate_minutes: 30 },
      { title: 'Study: algorithms set', priority: 'urgent', estimate_minutes: 90 },
    ]
    for (const s of samples) {
      await addTask(s)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const autoSchedule = async () => {
    try {
      await fetch(`${BASE_URL}/schedule/auto`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) })
      alert('Auto-scheduled current tasks into the next few hours!')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="relative max-w-6xl mx-auto px-6 py-10">
        <Hero onCreateSample={createSample} />

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="md:col-span-2 space-y-4">
            <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-4">
              <h2 className="text-white font-semibold mb-3">Add a task</h2>
              <TaskForm onAdd={addTask} />
            </div>

            {loading ? (
              <div className="text-slate-300">Loading tasks...</div>
            ) : (
              <TaskList tasks={tasks} onRefresh={loadTasks} />
            )}

            <div className="flex gap-3">
              <button onClick={autoSchedule} className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold">Auto-schedule</button>
              <a href="/test" className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600 text-white font-semibold">Backend & DB status</a>
            </div>
          </div>

          <div className="md:col-span-1 space-y-4">
            <Recommendations baseUrl={BASE_URL} />
            <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-4 text-slate-300 text-sm">
              <p>Tip: Use the button above to create sample tasks, then auto-schedule and check recommendations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
