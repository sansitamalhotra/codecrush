import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#B3CDE0] to-[#9FB7D4]">

            {/* FLOATING BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-96 h-96 bg-[#6497B1] rounded-full mix-blend-multiply filter blur-xl opacity-15"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -100, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-[#B3CDE0] rounded-full mix-blend-multiply filter blur-xl opacity-15"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 100, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* NAVIGATION */}
            <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 shadow-sm">
                <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-[#03396C]">CodeCrush</div>

                    <div className="flex gap-6 text-sm font-medium">
                        <a href="/" className="text-[#005B96] hover:text-[#03396C] transition-colors">Home</a>
                        <a href="/dashboard" className="text-[#03396C] font-bold">Dashboard</a>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-[#6497B1] text-white rounded-full hover:bg-[#005B96] transition-colors"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>

            {/* MAIN DASHBOARD CONTENT */}
            <div className="relative container mx-auto px-8 py-12 max-w-7xl">

                {/* WELCOME SECTION WITH MASCOT */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-8 mb-12 bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white"
                >
                    <div className="relative">
                        <motion.div
                            className="absolute inset-0 bg-[#6497B1] rounded-full blur-2xl opacity-20"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.2, 0.3, 0.2]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity
                            }}
                        />
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative w-40 h-40 bg-white/50 rounded-3xl flex items-center justify-center text-8xl shadow-lg"
                        >
                            🐹
                        </motion.div>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="absolute -top-6 -right-6 bg-white px-4 py-2 rounded-full shadow-lg text-sm font-medium text-[#03396C]"
                        >
                            You're on fire! 🔥
                        </motion.div>
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold text-[#03396C] mb-2">
                            Welcome back, Coder! 👋
                        </h1>
                        <p className="text-[#005B96] mb-3 text-lg">
                            7-day streak! You're crushing it! 💪
                        </p>
                        <div className="flex gap-3">
                            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">Level 5</span>
                            <span className="px-4 py-2 bg-[#B3CDE0] text-[#03396C] rounded-full text-sm font-medium">23 Solved</span>
                        </div>
                    </div>
                </motion.div>

                {/* STATS CARDS */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ scale: 1.03, y: -5 }}
                        className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white"
                    >
                        <div className="text-5xl mb-3">🌱</div>
                        <div className="text-4xl font-bold text-[#6497B1] mb-2">7 Days</div>
                        <div className="text-[#005B96] font-medium">Current Streak 🔥</div>
                        <div className="mt-2 text-sm text-[#6497B1]">Keep it going!</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.03, y: -5 }}
                        className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white"
                    >
                        <div className="text-5xl mb-3">✅</div>
                        <div className="text-4xl font-bold text-[#6497B1] mb-2">23</div>
                        <div className="text-[#005B96] font-medium">Problems Solved</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.03, y: -5 }}
                        className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white"
                    >
                        <div className="text-5xl mb-3">⭐</div>
                        <div className="text-4xl font-bold text-[#6497B1] mb-2">Level 5</div>
                        <div className="text-[#005B96] font-medium">Keep it up!</div>
                    </motion.div>
                </div>

                {/* PROBLEMS SECTION */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-white"
                >
                    <h2 className="text-3xl font-bold text-[#03396C] mb-8">
                        Today's Problems 🎯
                    </h2>

                    <div className="space-y-4">

                        {/* Problem 1 */}
                        <motion.div
                            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                            className="flex justify-between items-center p-6 bg-white rounded-xl shadow-md border border-[#E8F4F8]"
                        >
                            <div>
                                <h3 className="font-bold text-lg text-[#03396C]">Two Sum</h3>
                                <p className="text-sm text-[#6497B1]">Easy • Arrays</p>
                            </div>
                            <a href="/problem/two-sum">
                                <button className="px-6 py-3 bg-[#6497B1] text-white rounded-lg hover:bg-[#005B96] transition-colors font-medium">
                                    Solve →
                                </button>
                            </a>
                        </motion.div>

                        {/* Problem 2 */}
                        <motion.div
                            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                            className="flex justify-between items-center p-6 bg-white rounded-xl shadow-md border border-[#E8F4F8]"
                        >
                            <div>
                                <h3 className="font-bold text-lg text-[#03396C]">Valid Parentheses</h3>
                                <p className="text-sm text-[#6497B1]">Easy • Stack</p>
                            </div>
                            <a href="/problem/valid-parentheses">
                                <button className="px-6 py-3 bg-[#6497B1] text-white rounded-lg hover:bg-[#005B96] transition-colors font-medium">
                                    Solve →
                                </button>
                            </a>
                        </motion.div>

                        {/* Problem 3 */}
                        <motion.div
                            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                            className="flex justify-between items-center p-6 bg-white rounded-xl shadow-md border border-[#E8F4F8]"
                        >
                            <div>
                                <h3 className="font-bold text-lg text-[#03396C]">Merge Two Sorted Lists</h3>
                                <p className="text-sm text-[#6497B1]">Medium • Linked List</p>
                            </div>
                            <a href="/problem/merge-sorted-lists">
                                <button className="px-6 py-3 bg-[#6497B1] text-white rounded-lg hover:bg-[#005B96] transition-colors font-medium">
                                    Solve →
                                </button>
                            </a>
                        </motion.div>

                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Dashboard