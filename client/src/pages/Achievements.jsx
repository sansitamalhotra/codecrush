import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useState, useEffect } from 'react'
import { problemsDB } from '../data/problems.jsx'
import Mascot from '../components/Mascot'

function Achievements() {
  const { logout, currentUser } = useAuth()
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [unlockedAchievements, setUnlockedAchievements] = useState([])

  // Define all achievements
  const achievements = [
    {
      id: 'first-solve',
      title: 'First Steps',
      description: 'Solve your first problem',
      icon: '🎯',
      condition: (data) => (data?.totalSolved || 0) >= 1,
      rarity: 'Common'
    },
    {
      id: 'streak-3',
      title: 'Getting Consistent',
      description: 'Maintain a 3-day streak',
      icon: '🔥',
      condition: (data) => (data?.streak || 0) >= 3,
      rarity: 'Common'
    },
    {
      id: 'streak-7',
      title: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: '⚡',
      condition: (data) => (data?.streak || 0) >= 7,
      rarity: 'Rare'
    },
    {
      id: 'streak-30',
      title: 'Month Master',
      description: 'Maintain a 30-day streak',
      icon: '👑',
      condition: (data) => (data?.streak || 0) >= 30,
      rarity: 'Epic'
    },
    {
      id: 'solve-10',
      title: 'Problem Solver',
      description: 'Solve 10 problems',
      icon: '💪',
      condition: (data) => (data?.totalSolved || 0) >= 10,
      rarity: 'Common'
    },
    {
      id: 'solve-25',
      title: 'Rising Star',
      description: 'Solve 25 problems',
      icon: '⭐',
      condition: (data) => (data?.totalSolved || 0) >= 25,
      rarity: 'Rare'
    },
    {
      id: 'solve-50',
      title: 'Half Century',
      description: 'Solve 50 problems',
      icon: '🎖️',
      condition: (data) => (data?.totalSolved || 0) >= 50,
      rarity: 'Epic'
    },
    {
      id: 'level-5',
      title: 'Level 5 Reached',
      description: 'Reach level 5',
      icon: '🏅',
      condition: (data) => (data?.level || 1) >= 5,
      rarity: 'Rare'
    },
    {
      id: 'level-10',
      title: 'Elite Coder',
      description: 'Reach level 10',
      icon: '💎',
      condition: (data) => (data?.level || 1) >= 10,
      rarity: 'Epic'
    },
    {
      id: 'speed-demon',
      title: 'Speed Demon',
      description: 'Solve 5 problems in one day',
      icon: '🚀',
      condition: (data) => {
        const today = new Date().toDateString()
        const solvedToday = data?.solvedToday || {}
        return (solvedToday[today] || 0) >= 5
      },
      rarity: 'Rare'
    },
    {
      id: 'bookworm',
      title: 'Bookworm',
      description: 'Bookmark 5 problems',
      icon: '📚',
      condition: (data) => (data?.bookmarkedProblems?.length || 0) >= 5,
      rarity: 'Common'
    },
    {
      id: 'note-taker',
      title: 'Note Taker',
      description: 'Add notes to 3 problems',
      icon: '📝',
      condition: (data) => {
        const notes = data?.problemNotes || {}
        return Object.keys(notes).filter(key => notes[key].length > 0).length >= 3
      },
      rarity: 'Common'
    },
    {
      id: 'array-master',
      title: 'Array Master',
      description: 'Solve 5 Array problems',
      icon: '📊',
      condition: (data) => {
        const solved = data?.solvedProblems || []
        const arraySolved = solved.filter(id => problemsDB[id]?.category === 'Arrays')
        return arraySolved.length >= 5
      },
      rarity: 'Rare'
    },
    {
      id: 'string-guru',
      title: 'String Guru',
      description: 'Solve 5 String problems',
      icon: '🔤',
      condition: (data) => {
        const solved = data?.solvedProblems || []
        const stringSolved = solved.filter(id => problemsDB[id]?.category === 'Strings')
        return stringSolved.length >= 5
      },
      rarity: 'Rare'
    },
    {
      id: 'beginner-complete',
      title: 'Beginner Complete',
      description: 'Solve all Beginner problems',
      icon: '🎓',
      condition: (data) => {
        const solved = data?.solvedProblems || []
        const beginnerProblems = Object.values(problemsDB).filter(p => p.difficulty === 'Beginner')
        const beginnerSolved = solved.filter(id => problemsDB[id]?.difficulty === 'Beginner')
        return beginnerSolved.length === beginnerProblems.length && beginnerProblems.length > 0
      },
      rarity: 'Epic'
    },
    {
      id: 'all-rounder',
      title: 'All-Rounder',
      description: 'Solve at least 1 problem from each category',
      icon: '🌟',
      condition: (data) => {
        const solved = data?.solvedProblems || []
        const categories = new Set(solved.map(id => problemsDB[id]?.category).filter(Boolean))
        const allCategories = new Set(Object.values(problemsDB).map(p => p.category))
        return categories.size === allCategories.size
      },
      rarity: 'Epic'
    },
    {
      id: 'xp-1000',
      title: 'XP Collector',
      description: 'Earn 1000 XP',
      icon: '💰',
      condition: (data) => (data?.xp || 0) >= 1000,
      rarity: 'Rare'
    },
    {
      id: 'early-bird',
      title: 'Early Bird',
      description: 'Join CodeCrush',
      icon: '🐣',
      condition: (data) => true, // Everyone gets this
      rarity: 'Common'
    }
  ]

  useEffect(() => {
    const loadAchievements = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
        const data = userDoc.data()
        setUserData(data)

        // Check which achievements are unlocked
        const unlocked = achievements.filter(achievement => 
          achievement.condition(data)
        )
        setUnlockedAchievements(unlocked)
      }
      setLoading(false)
    }
    loadAchievements()
  }, [currentUser])

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Common': return 'from-gray-400 to-gray-600'
      case 'Rare': return 'from-blue-400 to-blue-600'
      case 'Epic': return 'from-purple-400 to-purple-600'
      case 'Legendary': return 'from-yellow-400 to-yellow-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#B3CDE0] to-[#9FB7D4] flex items-center justify-center">
        <div className="text-4xl text-[#03396C]">Loading...</div>
      </div>
    )
  }

  const unlockedCount = unlockedAchievements.length
  const totalCount = achievements.length
  const progressPercentage = (unlockedCount / totalCount) * 100

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
            <Link to="/stats" className="text-[#005B96] hover:text-[#03396C] transition-colors">Stats</Link>
            <Link to="/achievements" className="text-[#03396C] font-bold">Achievements</Link>
            <Link to="/bookmarks" className="text-[#005B96] hover:text-[#03396C] transition-colors">Bookmarks</Link>
            <Link to="/settings" className="text-[#005B96] hover:text-[#03396C] transition-colors">Settings</Link>
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
            <h1 className="text-4xl font-bold text-[#03396C] mb-2">🏆 Achievements</h1>
            <p className="text-[#6497B1]">Unlock badges and show off your progress!</p>
          </div>
          <Mascot 
            state={unlockedCount > 10 ? 'superHappy' : unlockedCount > 5 ? 'excited' : 'happy'} 
            size="medium" 
          />
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[#03396C]">Overall Progress</h2>
            <span className="text-3xl font-bold text-[#6497B1]">{unlockedCount}/{totalCount}</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-[#6497B1] to-[#005B96] h-4 rounded-full"
            />
          </div>
          <p className="text-sm text-[#6497B1]">{Math.round(progressPercentage)}% Complete</p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const isUnlocked = unlockedAchievements.some(a => a.id === achievement.id)
            
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: isUnlocked ? 1.05 : 1 }}
                className={`relative p-6 rounded-2xl shadow-lg border-2 transition-all ${
                  isUnlocked
                    ? 'bg-white border-[#6497B1]'
                    : 'bg-gray-100 border-gray-300 opacity-60'
                }`}
              >
                {/* Rarity Badge */}
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getRarityColor(achievement.rarity)}`}>
                  {achievement.rarity}
                </div>

                {/* Icon */}
                <div className={`text-6xl mb-4 ${isUnlocked ? '' : 'grayscale'}`}>
                  {achievement.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#03396C] mb-2">
                  {achievement.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#6497B1] mb-4">
                  {achievement.description}
                </p>

                {/* Status */}
                <div className="flex items-center gap-2">
                  {isUnlocked ? (
                    <span className="flex items-center gap-1 text-green-600 font-medium text-sm">
                      <span>✓</span> Unlocked
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-gray-500 font-medium text-sm">
                      <span>🔒</span> Locked
                    </span>
                  )}
                </div>

                {/* Unlock Animation */}
                {isUnlocked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <div className="absolute top-0 right-0 text-4xl">✨</div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-[#03396C] mb-6">Achievement Stats</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {['Common', 'Rare', 'Epic', 'Legendary'].map((rarity, index) => {
              const rarityAchievements = achievements.filter(a => a.rarity === rarity)
              const unlockedRarity = unlockedAchievements.filter(a => a.rarity === rarity)
              
              return (
                <div key={rarity} className="text-center">
                  <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${getRarityColor(rarity)} bg-clip-text text-transparent`}>
                    {unlockedRarity.length}/{rarityAchievements.length}
                  </div>
                  <div className="text-[#03396C] font-medium">{rarity}</div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Achievements