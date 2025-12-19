import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useState, useEffect } from 'react'
import { problemsDB } from '../data/problems.jsx'
import { calculateLevel, getXPForNextLevel, getXPProgress } from '../utils/streakUtils'
import { Analytics } from '@vercel/analytics/react'
import Mascot from '../components/Mascot'

function Dashboard() {
    const { logout, currentUser } = useAuth()
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [dailyProgress, setDailyProgress] = useState(0)
    const [showLevelUp, setShowLevelUp] = useState(false)

    // FILTERS STATE
    const [filterDifficulty, setFilterDifficulty] = useState('all')
    const [filterCategory, setFilterCategory] = useState('all')
    const [filterStatus, setFilterStatus] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const loadUserData = async () => {
            if (currentUser) {
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
                if (userDoc.exists()) {
                    const data = userDoc.data()

                    // Check and update streak
                    await checkStreak(data)

                    // Reload data after streak update
                    const updatedDoc = await getDoc(doc(db, 'users', currentUser.uid))
                    const updatedData = updatedDoc.data()

                    // Calculate level from XP
                    const calculatedLevel = calculateLevel(updatedData.xp || 0)

                    // If level changed, show level up animation
                    if (calculatedLevel > (updatedData.level || 1)) {
                        await updateDoc(doc(db, 'users', currentUser.uid), {
                            level: calculatedLevel
                        })
                        setShowLevelUp(true)
                        setTimeout(() => setShowLevelUp(false), 3000)
                    }

                    setUserData({ ...updatedData, level: calculatedLevel })

                    // Calculate daily progress
                    const today = new Date().toDateString()
                    const solvedToday = updatedData.solvedToday || {}
                    const todayCount = solvedToday[today] || 0
                    const dailyGoal = parseInt(updatedData.dailyGoal) || 1
                    setDailyProgress((todayCount / dailyGoal) * 100)
                }
                setLoading(false)
            }
        }
        loadUserData()
    }, [currentUser])

    const checkStreak = async (userData) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const lastLogin = userData.lastLoginDate?.toDate?.() || null

        if (!lastLogin) {
            // First login
            await updateDoc(doc(db, 'users', currentUser.uid), {
                streak: 1,
                lastLoginDate: today
            })
            return
        }

        const lastLoginDate = new Date(lastLogin)
        lastLoginDate.setHours(0, 0, 0, 0)

        const daysDiff = Math.floor((today - lastLoginDate) / (1000 * 60 * 60 * 24))

        if (daysDiff === 0) {
            // Same day - no update
            return
        } else if (daysDiff === 1) {
            // Next day - increment streak
            await updateDoc(doc(db, 'users', currentUser.uid), {
                streak: increment(1),
                lastLoginDate: today
            })
        } else {
            // Missed days - reset streak
            await updateDoc(doc(db, 'users', currentUser.uid), {
                streak: 1,
                lastLoginDate: today
            })
        }
    }

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    const getProblemsForUser = () => {
        const solved = userData?.solvedProblems || []
        let allProblems = Object.values(problemsDB)

        // Apply difficulty filter
        if (filterDifficulty !== 'all') {
            allProblems = allProblems.filter(p => p.difficulty === filterDifficulty)
        }

        // Apply category filter
        if (filterCategory !== 'all') {
            allProblems = allProblems.filter(p => p.category === filterCategory)
        }

        // Apply status filter
        if (filterStatus === 'solved') {
            allProblems = allProblems.filter(p => solved.includes(p.id))
        } else if (filterStatus === 'unsolved') {
            allProblems = allProblems.filter(p => !solved.includes(p.id))
        }

        // Apply search query
        if (searchQuery) {
            allProblems = allProblems.filter(p =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // If no filters applied, show default 3 problems at user's level
        if (filterDifficulty === 'all' && filterCategory === 'all' && filterStatus === 'all' && !searchQuery) {
            const userLevel = userData?.codingLevel || 'beginner'
            const difficultyMap = {
                'true-beginner': 'True Beginner',
                'beginner': 'Beginner',
                'intermediate': 'Intermediate',
                'advanced': 'Advanced'
            }
            const targetDifficulty = difficultyMap[userLevel]
            const unsolvedProblems = allProblems.filter(p =>
                p.difficulty === targetDifficulty && !solved.includes(p.id)
            )

            if (unsolvedProblems.length === 0) {
                const levels = ['True Beginner', 'Beginner', 'Intermediate', 'Advanced']
                const currentIndex = levels.indexOf(targetDifficulty)
                const nextDifficulty = levels[currentIndex + 1] || targetDifficulty

                return allProblems.filter(p =>
                    p.difficulty === nextDifficulty && !solved.includes(p.id)
                ).slice(0, 3)
            }

            return unsolvedProblems.sort(() => Math.random() - 0.5).slice(0, 3)
        }

        return allProblems
    }

    // Get unique categories
    const categories = [...new Set(Object.values(problemsDB).map(p => p.category))]

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#B3CDE0] to-[#9FB7D4] flex items-center justify-center">
                <div className="text-4xl text-[#03396C]">Loading...</div>
            </div>
        )
    }

    const filteredProblems = getProblemsForUser()
    const xpProgress = getXPProgress(userData?.xp || 0)
    const xpNeeded = getXPForNextLevel(userData?.xp || 0)

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#B3CDE0] to-[#9FB7D4]">
            <Analytics />

            {/* Level Up Animation */}
            <AnimatePresence>
                {showLevelUp && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1 }}
                            className="text-9xl mb-8"
                            style={{ imageRendering: 'pixelated' }}
                        >
                            ⭐
                        </motion.div>
                        <div className="text-5xl font-bold text-white mb-2">
                            Level {userData?.level}!
                        </div>
                        <div className="text-2xl text-white/80">
                            Keep crushing it! 🎉
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-96 h-96 bg-[#6497B1] rounded-full mix-blend-multiply filter blur-xl opacity-15"
                    animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-[#B3CDE0] rounded-full mix-blend-multiply filter blur-xl opacity-15"
                    animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Navigation */}
            <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 shadow-sm">
                <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-[#03396C] hover:text-[#005B96] transition-colors">
                        CodeCrush
                    </Link>

                    <div className="flex gap-6 text-sm font-medium items-center">
                        <Link to="/" className="text-[#005B96] hover:text-[#03396C] transition-colors">Home</Link>
                        <Link to="/dashboard" className="text-[#03396C] font-bold">Dashboard</Link>
                        <Link to="/stats" className="text-[#005B96] hover:text-[#03396C] transition-colors">Stats</Link>
                        <Link to="/bookmarks" className="text-[#005B96] hover:text-[#03396C] transition-colors">Bookmarks</Link>
                        <Link to="/settings" className="text-[#005B96] hover:text-[#03396C] transition-colors">Settings</Link>
                        <Link to="/achievements" className="text-[#005B96] hover:text-[#03396C] transition-colors">Achievements</Link>
                        <button onClick={handleLogout} className="px-4 py-2 bg-[#6497B1] text-white rounded-full hover:bg-[#005B96] transition-colors">
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>

            <div className="relative container mx-auto px-8 py-12 max-w-7xl">

                {/* Welcome Section with MASCOT */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-8 mb-12 bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white"
                >
                    <Mascot
                        state={
                            userData?.streak === 0 ? 'thinking' :
                                userData?.streak >= 30 ? 'onFire' :
                                    userData?.streak >= 7 ? 'superHappy' :
                                        userData?.streak >= 3 ? 'excited' :
                                            'happy'
                        }
                        size="large"
                        message={
                            userData?.streak === 0 ? "Let's start a streak! 💪" :
                                userData?.streak >= 30 ? `${userData.streak} days! LEGEND! 👑` :
                                    userData?.streak >= 7 ? `${userData.streak} days! Unstoppable! ⚡` :
                                        userData?.streak >= 3 ? `${userData.streak} days! On fire! 🔥` :
                                            `${userData.streak} day streak! 🎉`
                        }
                    />

                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-[#03396C] mb-2">
                            Welcome back, {userData?.name || 'Coder'}! 👋
                        </h1>
                        <p className="text-[#005B96] mb-3 text-lg">
                            Level {userData?.level || 1} • {userData?.xp || 0} XP
                        </p>

                        {/* XP Progress Bar */}
                        <div className="mb-3">
                            <div className="flex justify-between text-sm text-[#6497B1] mb-1">
                                <span>Level {userData?.level || 1}</span>
                                <span>{xpNeeded} XP to next level</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3" style={{ imageRendering: 'pixelated' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${xpProgress}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="bg-gradient-to-r from-[#6497B1] to-[#005B96] h-3 rounded-full"
                                    style={{ imageRendering: 'pixelated' }}
                                />
                            </div>
                        </div>

                        {/* Daily Goal Progress */}
                        <div>
                            <div className="flex justify-between text-sm text-[#6497B1] mb-1">
                                <span>Daily Goal: {userData?.dailyGoal || 1} problems</span>
                                <span>{Math.min(100, Math.round(dailyProgress))}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2" style={{ imageRendering: 'pixelated' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(100, dailyProgress)}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="bg-green-500 h-2 rounded-full"
                                    style={{ imageRendering: 'pixelated' }}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-4">
                            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium" style={{ imageRendering: 'pixelated' }}>Level {userData?.level || 1}</span>
                            <span className="px-4 py-2 bg-[#B3CDE0] text-[#03396C] rounded-full text-sm font-medium" style={{ imageRendering: 'pixelated' }}>{userData?.totalSolved || 0} Solved</span>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ scale: 1.03, y: -5 }}
                        className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white"
                        style={{ imageRendering: 'pixelated' }}
                    >
                        <div className="text-5xl mb-3" style={{ imageRendering: 'pixelated' }}>🔥</div>
                        <div className="text-4xl font-bold text-[#6497B1] mb-2">{userData?.streak || 0} Days</div>
                        <div className="text-[#005B96] font-medium">Current Streak</div>
                        <div className="mt-2 text-sm text-[#6497B1]">{userData?.streak > 0 ? 'Keep it going!' : 'Solve a problem today!'}</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.03, y: -5 }}
                        className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white"
                        style={{ imageRendering: 'pixelated' }}
                    >
                        <div className="text-5xl mb-3" style={{ imageRendering: 'pixelated' }}>✅</div>
                        <div className="text-4xl font-bold text-[#6497B1] mb-2">{userData?.totalSolved || 0}</div>
                        <div className="text-[#005B96] font-medium">Problems Solved</div>
                        <div className="mt-2 text-sm text-[#6497B1]">Total: {Object.keys(problemsDB).length} problems</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.03, y: -5 }}
                        className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white"
                        style={{ imageRendering: 'pixelated' }}
                    >
                        <div className="text-5xl mb-3" style={{ imageRendering: 'pixelated' }}>⚡</div>
                        <div className="text-4xl font-bold text-[#6497B1] mb-2">{userData?.xp || 0} XP</div>
                        <div className="text-[#005B96] font-medium">Experience Points</div>
                        <div className="mt-2 text-sm text-[#6497B1]">{xpNeeded} XP to level up!</div>
                    </motion.div>
                </div>

                {/* FILTERS SECTION */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg mb-8"
                >
                    <h2 className="text-2xl font-bold text-[#03396C] mb-6">🔍 Find Problems</h2>

                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                        {/* Difficulty Filter */}
                        <div>
                            <label className="block text-sm font-medium text-[#03396C] mb-2">Difficulty</label>
                            <select
                                value={filterDifficulty}
                                onChange={(e) => setFilterDifficulty(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-[#E8F4F8] rounded-lg focus:border-[#6497B1] focus:outline-none"
                            >
                                <option value="all">All Difficulties</option>
                                <option value="True Beginner">True Beginner</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-medium text-[#03396C] mb-2">Category</label>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-[#E8F4F8] rounded-lg focus:border-[#6497B1] focus:outline-none"
                            >
                                <option value="all">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-[#03396C] mb-2">Status</label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-[#E8F4F8] rounded-lg focus:border-[#6497B1] focus:outline-none"
                            >
                                <option value="all">All Problems</option>
                                <option value="solved">Solved</option>
                                <option value="unsolved">Unsolved</option>
                            </select>
                        </div>

                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium text-[#03396C] mb-2">Search</label>
                            <input
                                type="text"
                                placeholder="Search problems..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-[#E8F4F8] rounded-lg focus:border-[#6497B1] focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Clear Filters */}
                    {(filterDifficulty !== 'all' || filterCategory !== 'all' || filterStatus !== 'all' || searchQuery) && (
                        <button
                            onClick={() => {
                                setFilterDifficulty('all')
                                setFilterCategory('all')
                                setFilterStatus('all')
                                setSearchQuery('')
                            }}
                            className="text-sm text-[#6497B1] hover:text-[#005B96] font-medium"
                        >
                            Clear All Filters
                        </button>
                    )}
                </motion.div>

                {/* Problems Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-white"
                >
                    <h2 className="text-3xl font-bold text-[#03396C] mb-8">
                        {filterDifficulty === 'all' && filterCategory === 'all' && filterStatus === 'all' && !searchQuery
                            ? "Today's Problems 🎯"
                            : `Filtered Problems (${filteredProblems.length})`}
                    </h2>

                    {filteredProblems.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4" style={{ imageRendering: 'pixelated' }}>🔍</div>
                            <h3 className="text-2xl font-bold text-[#03396C] mb-2">No problems found!</h3>
                            <p className="text-[#6497B1]">Try adjusting your filters</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredProblems.map((problem, index) => (
                                <motion.div
                                    key={problem.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                                    className="flex justify-between items-center p-6 bg-white rounded-xl shadow-md border border-[#E8F4F8]"
                                >
                                    <div>
                                        <h3 className="font-bold text-lg text-[#03396C]">{problem.title}</h3>
                                        <p className="text-sm text-[#6497B1]">{problem.difficulty} • {problem.category}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {userData?.solvedProblems?.includes(problem.id) && (
                                            <span className="text-green-500 font-bold">✓ Solved</span>
                                        )}
                                        <button
                                            onClick={() => navigate(`/problem/${problem.id}`)}
                                            className="px-6 py-3 bg-[#6497B1] text-white rounded-lg hover:bg-[#005B96] transition-colors font-medium"
                                        >
                                            Solve →
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}

export default Dashboard