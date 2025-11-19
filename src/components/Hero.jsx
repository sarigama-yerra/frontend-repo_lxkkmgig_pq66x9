import { motion } from 'framer-motion'

export default function Hero({ onCreateSample }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(600px_200px_at_50%_-20%,rgba(59,130,246,0.25),transparent)]" />
      <div className="relative max-w-6xl mx-auto px-6 py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
        >
          Smart Timetable & Productivity
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-lg md:text-2xl text-blue-200/90"
        >
          Auto-schedule tasks, get habit-aware reminders, and see the best next step.
        </motion.p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={onCreateSample} className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow">
            Create sample tasks
          </button>
          <a href="/test" className="px-5 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold shadow">
            Check backend
          </a>
        </div>
      </div>
    </section>
  )
}
