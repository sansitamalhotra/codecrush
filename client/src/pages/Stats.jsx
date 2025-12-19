import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useState, useEffect } from 'react'
import { problemsDB } from '../data/problems.jsx'
import Mascot from '../components/Mascot'

function Stats() {
  const { logout, currentUser } = useAuth()
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [categoryStats, setCategoryStats] = useState({})
  const [difficultyStats, setDifficultyStats] = useState({})
  const [heatmapData, setHeatmapData] = useState([])

  useEffect(() => {
    const loadStats = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
        const data = userDoc.data()
        setUserData(data)

        // Calculate category stats
        const solved = data?.solvedProblems || []
        const categories = {}
        const difficulties = {
          'True Beginner': { solved: 0, total: 0 },
          'Beginner': { solved: 0, total: 0 },
          'Intermediate': { solved: 0, total: 0 },
          'Advanced': { solved: 0, total: 0 }
        }

        Object.values(problemsDB).forEach(problem => {
          // Category stats
          if (!categories[problem.category]) {
            categories[problem.category] = { solved: 0, total: 0 }
          }
          categories[problem.category].total++
          if (solved.includes(problem.id)) {
            categories[problem.category].solved++
          }

          // Difficulty stats
          difficulties[problem.difficulty].total++
          if (solved.includes(problem.id)) {
            difficulties[problem.difficulty].solved++
          }
        })

        setCategoryStats(categories)
        setDifficultyStats(difficulties)

        // Generate heatmap data (last 60 days)
        const heatmap = []
        const today = new Date()
        const solvedToday = data?.solvedToday || {}
        
        for (let i = 59; i >= 0; i--) {
          const date = new Date(today)
          date.setDate(date.getDate() - i)
          const dateStr = date.toDateString()
          const count = solvedToday[dateStr] || 0
          
          heatmap.push({
            date: dateStr,
            count: count,
            color: count === 0 ? '#E8F4F8' : 
                   count === 1 ? '#B3CDE0' :
                   count === 2 ? '#6497B1' :
                   count >= 3 ? '#005B96' : '#E8F4F8'
          })
        }
        setHeatmapData(heatmap)
      }
      setLoading(false)
    }
    loadStats()
  }, [currentUser])

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#B3CDE0] to-[#9FB7D4] flex items-center justify-center">
        <div className="text-4xl text-[#03396C]">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#B3CDE0] to-[#9FB7D4]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-[#03396C] hover:text-[#005B96] transition-colors">
            CodeCrush
          </Link>

          <div className="flex gap-6 text-sm font-medium items-center">
            <Link to="/" className="text-[#005B96] hover:text-[#03396C] transition-colors">Home</Link>
            <Link to="/dashboard" className="text-[#005B96] hover:text-[#03396C] transition-colors">Dashboard</Link>
            <Link to="/stats" className="text-[#03396C] font-bold">Stats</Link>
            <Link to="/bookmarks" className="text-[#005B96] hover:text-[#03396C] transition-colors">Bookmarks</Link>
            <Link to="/settings" className="text-[#005B96] hover:text-[#03396C] transition-colors">Settings</Link>
            <Link to="/achievements" className="text-[#005B96] hover:text-[#03396C] transition-colors">Achievements</Link>
            <button onClick={handleLogout} className="px-4 py-2 bg-[#6497B1] text-white rounded-full hover:bg-[#005B96] transition-colors">
              Log Out
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-8 py-12 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h1 className="text-4xl font-bold text-[#03396C] mb-2">📊 Your Stats</h1>
            <p className="text-[#6497B1]">Track your progress and achievements</p>
          </div>
          <Mascot 
            state={userData?.totalSolved > 20 ? 'superHappy' : userData?.totalSolved > 10 ? 'excited' : 'happy'} 
            size="medium" 
          />
        </motion.div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: '🎯', label: 'Total Solved', value: userData?.totalSolved || 0, total: Object.keys(problemsDB).length },
            { icon: '🔥', label: 'Current Streak', value: `${userData?.streak || 0} days`, total: null },
            { icon: '⚡', label: 'Total XP', value: userData?.xp || 0, total: null },
            { icon: '🏆', label: 'Level', value: userData?.level || 1, total: null }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-[#6497B1] mb-1">{stat.value}</div>
              <div className="text-[#03396C] font-medium">{stat.label}</div>
              {stat.total && (
                <div className="text-sm text-[#6497B1] mt-2">of {stat.total}</div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg mb-12"
        >
          <h2 className="text-2xl font-bold text-[#03396C] mb-6">📅 Activity Heatmap (Last 60 Days)</h2>
          
          <div className="grid grid-cols-10 gap-2">
            {heatmapData.map((day, index) => (
              <div
                key={index}
                className="aspect-square rounded-md transition-all hover:scale-110 cursor-pointer relative group"
                style={{ 
                  backgroundColor: day.color,
                  imageRendering: 'pixelated'
                }}
                title={`${day.date}: ${day.count} problems`}
              >
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  {new Date(day.date).toLocaleDateString()}: {day.count} solved
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-6 text-sm text-[#6497B1]">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#E8F4F8' }}></div>
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#B3CDE0' }}></div>
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#6497B1' }}></div>
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#005B96' }}></div>
            </div>
            <span>More</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Category Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-bold text-[#03396C] mb-6">📚 Category Breakdown</h2>
            
            <div className="space-y-4">
              {Object.entries(categoryStats).map(([category, stats], index) => {
                const percentage = (stats.solved / stats.total) * 100
                return (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-[#03396C]">{category}</span>
                      <span className="text-[#6497B1]">{stats.solved}/{stats.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="bg-gradient-to-r from-[#6497B1] to-[#005B96] h-3 rounded-full"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Difficulty Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-bold text-[#03396C] mb-6">🎚️ Difficulty Breakdown</h2>
            
            <div className="space-y-4">
              {Object.entries(difficultyStats).map(([difficulty, stats], index) => {
                const percentage = stats.total > 0 ? (stats.solved / stats.total) * 100 : 0
                const colors = {
                  'True Beginner': 'from-green-400 to-green-600',
                  'Beginner': 'from-blue-400 to-blue-600',
                  'Intermediate': 'from-yellow-400 to-yellow-600',
                  'Advanced': 'from-red-400 to-red-600'
                }
                return (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-[#03396C]">{difficulty}</span>
                      <span className="text-[#6497B1]">{stats.solved}/{stats.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`bg-gradient-to-r ${colors[difficulty]} h-3 rounded-full`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Stats