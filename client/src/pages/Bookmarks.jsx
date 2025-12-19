import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useState, useEffect } from 'react'
import { problemsDB } from '../data/problems.jsx'
import Mascot from '../components/Mascot'

function Bookmarks() {
    const { logout, currentUser } = useAuth()
    const navigate = useNavigate()
    const [bookmarkedProblems, setBookmarkedProblems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadBookmarks = async () => {
            if (currentUser) {
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
                const userData = userDoc.data()

                const bookmarkIds = userData?.bookmarkedProblems || []
                const problems = bookmarkIds.map(id => problemsDB[id]).filter(Boolean)

                setBookmarkedProblems(problems)
            }
            setLoading(false)
        }
        loadBookmarks()
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
                        <Link to="/bookmarks" className="text-[#03396C] font-bold">Bookmarks</Link>
                        <Link to="/settings" className="text-[#005B96] hover:text-[#03396C] transition-colors">Settings</Link>
                        <Link to="/achievements" className="text-[#005B96] hover:text-[#03396C] transition-colors">Achievements</Link>
                        <button onClick={handleLogout} className="px-4 py-2 bg-[#6497B1] text-white rounded-full hover:bg-[#005B96] transition-colors">
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-8 py-12 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-[#03396C] mb-2">⭐ Bookmarked Problems</h1>
                    <p className="text-[#6497B1]">Problems you want to revisit later</p>
                </motion.div>

                {bookmarkedProblems.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white/80 backdrop-blur-lg p-12 rounded-3xl shadow-xl text-center"
                    >
                        <Mascot state="thinking" size="large" />
                        <h2 className="text-2xl font-bold text-[#03396C] mt-6 mb-2">No bookmarks yet!</h2>
                        <p className="text-[#6497B1] mb-6">Star problems you want to come back to</p>
                        <Link to="/dashboard">
                            <button className="px-6 py-3 bg-[#6497B1] text-white rounded-xl hover:bg-[#005B96] transition-colors font-medium">
                                Browse Problems →
                            </button>
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl"
                    >
                        <div className="space-y-4">
                            {bookmarkedProblems.map((problem, index) => (
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
                                    <Link to={`/problem/${problem.id}`}>
                                        <button className="px-6 py-3 bg-[#6497B1] text-white rounded-lg hover:bg-[#005B96] transition-colors font-medium">
                                            Solve →
                                        </button>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default Bookmarks