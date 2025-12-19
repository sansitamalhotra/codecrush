import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useState, useEffect } from 'react'
import { problemsDB } from '../data/problems'
import { calculateLevel, getXPForNextLevel, getXPProgress } from '../utils/streakUtils'
import { Analytics } from '@vercel/analytics/react'

function Dashboard() {
    const { logout, currentUser } = useAuth()
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [dailyProgress, setDailyProgress] = useState(0)
    const [showLevelUp, setShowLevelUp] = useState(false)

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
        const userLevel = userData?.codingLevel || 'beginner'
        const solved = userData?.solvedProblems || []

        const difficultyMap = {
            'true-beginner': 'True Beginner',
            'beginner': 'Beginner',
            'intermediate': 'Intermediate',
            'advanced': 'Advanced'
        }

        const targetDifficulty = difficultyMap[userLevel]

        const unsolvedProblems = Object.values(problemsDB).filter(p =>
            p.difficulty === targetDifficulty && !solved.includes(p.id)
        )

        if (unsolvedProblems.length === 0) {
            const levels = ['True Beginner', 'Beginner', 'Intermediate', 'Advanced']
            const currentIndex = levels.indexOf(targetDifficulty)
            const nextDifficulty = levels[currentIndex + 1] || targetDifficulty

            return Object.values(problemsDB).filter(p =>
                p.difficulty === nextDifficulty && !solved.includes(p.id)
            ).slice(0, 3)
        }

        return unsolvedProblems.sort(() => Math.random() - 0.5).slice(0, 3)
    }

    const getMascotEmoji = () => {
        const streak = userData?.streak || 0
        if (streak === 0) return '🐹'
        if (streak >= 1 && streak < 3) return '😊'
        if (streak >= 3 && streak < 7) return '🔥'
        if (streak >= 7 && streak < 30) return '⚡'
        if (streak >= 30) return '👑'
        return '🐹'
    }

    const getMascotMessage = () => {
        const streak = userData?.streak || 0
        if (streak === 0) return "Let's start a streak! 💪"
        if (streak >= 1 && streak < 3) return `${streak} day streak! 🎉`
        if (streak >= 3 && streak < 7) return `${streak} days! On fire! 🔥`
        if (streak >= 7 && streak < 30) return `${streak} days! Unstoppable! ⚡`
        if (streak >= 30) return `${streak} days! LEGEND! 👑`
        return "Keep going! 💪"
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#B3CDE0] to-[#9FB7D4] flex items-center justify-center">
                <div className="text-4xl text-[#03396C]">Loading...</div>
            </div>
        )
    }

    const todaysProblems = getProblemsForUser()
    const xpProgress = getXPProgress(userData?.xp || 0)
    const xpNeeded = getXPForNextLevel(userData?.xp || 0)

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#B3CDE0] to-[#9FB7D4]">
            <Analytics />

            {/* Level Up Animation - FIXED POSITIONING */}
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

            {/* UPDATED NAV WITH HOME BUTTON */}
            <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 shadow-sm">
                <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
                    <a href="/" className="text-2xl font-bold text-[#03396C] hover:text-[#005B96] transition-colors">
                        CodeCrush
                    </a>

                    <div className="flex gap-6 text-sm font-medium items-center">
                        <a href="/" className="text-[#005B96] hover:text-[#03396C] transition-colors">Home</a>
                        <a href="/dashboard" className="text-[#03396C] font-bold">Dashboard</a>
                        <a href="/settings" className="text-[#005B96] hover:text-[#03396C] transition-colors">Settings</a>
                        <button onClick={handleLogout} className="px-4 py-2 bg-[#6497B1] text-white rounded-full hover:bg-[#005B96] transition-colors">
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>

            <div className="relative container mx-auto px-8 py-12 max-w-7xl">

                {/* Welcome Section with REACTIVE MASCOT */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-8 mb-12 bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white"
                >
                    {/* MASCOT WITH REACTIONS */}
                    <div className="relative">
                        <motion.div
                            className="absolute inset-0 bg-[#6497B1] rounded-full blur-2xl opacity-20"
                            animate={{
                                scale: userData?.streak >= 7 ? [1, 1.3, 1] : [1, 1.2, 1],
                                opacity: userData?.streak >= 7 ? [0.2, 0.4, 0.2] : [0.2, 0.3, 0.2]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />

                        <motion.div
                            animate={{
                                y: userData?.streak >= 7 ? [0, -20, 0] : userData?.streak > 0 ? [0, -10, 0] : [0, -5, 0],
                                rotate: userData?.streak >= 30 ? [0, 15, -15, 0] : userData?.streak >= 7 ? [0, 10, -10, 0] : [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: userData?.streak >= 30 ? 1.5 : userData?.streak >= 7 ? 2 : 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative w-40 h-40 bg-white/50 rounded-3xl flex items-center justify-center text-8xl shadow-lg"
                            style={{ imageRendering: 'pixelated' }}
                        >
                            {getMascotEmoji()}
                        </motion.div>

                        {/* Dynamic message bubble - PIXELATED */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="absolute -top-6 -right-6 bg-white px-4 py-2 rounded-full shadow-lg text-sm font-medium text-[#03396C]"
                            style={{ imageRendering: 'pixelated' }}
                        >
                            {getMascotMessage()}
                        </motion.div>
                    </div>

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

                {/* Stats Cards - PIXELATED */}
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

                {/* Problems Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-white"
                >
                    <h2 className="text-3xl font-bold text-[#03396C] mb-8">Today's Problems 🎯</h2>
                    {todaysProblems.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4" style={{ imageRendering: 'pixelated' }}>🎉</div>
                            <h3 className="text-2xl font-bold text-[#03396C] mb-2">Amazing work!</h3>
                            <p className="text-[#6497B1]">You've completed all problems at your level!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {todaysProblems.map((problem, index) => (
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
                                    <a href={`/problem/${problem.id}`}>
                                        <button className="px-6 py-3 bg-[#6497B1] text-white rounded-lg hover:bg-[#005B96] transition-colors font-medium">
                                            Solve →
                                        </button>
                                    </a>
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