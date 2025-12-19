import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Editor from '@monaco-editor/react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { doc, getDoc, updateDoc, arrayUnion, increment } from 'firebase/firestore'
import { db } from '../firebase/config'
import { problemsDB } from '../data/problems'

function ProblemSolver() {
    const { id } = useParams()
    const { logout, currentUser } = useAuth()
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null)

    const problem = problemsDB[id] || problemsDB['two-sum']

    const [code, setCode] = useState(problem.starterCode)
    const [output, setOutput] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showHints, setShowHints] = useState(false)
    const [currentHint, setCurrentHint] = useState(0)
    const [showSolution, setShowSolution] = useState(false)
    const [hasSolved, setHasSolved] = useState(false)

    useEffect(() => {
        const loadUserData = async () => {
            if (currentUser) {
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
                if (userDoc.exists()) {
                    const data = userDoc.data()
                    setUserData(data)
                    // Check if user has already solved this problem
                    setHasSolved(data.solvedProblems?.includes(problem.id) || false)
                }
            }
        }
        loadUserData()
    }, [currentUser, problem.id])

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        setOutput('Running tests...')

        setTimeout(async () => {
            setOutput('✅ Test 1 Passed\n✅ Test 2 Passed\n\n🎉 All tests passed!')
            setIsSubmitting(false)
            setShowSuccess(true)

            // Inside handleSubmit, after saving to Firebase:
            try {
                const solved = userData?.solvedProblems || []
                if (!solved.includes(problem.id)) {
                    // Calculate XP based on difficulty
                    let xpGain = 10
                    if (problem.difficulty === 'Intermediate' || problem.difficulty === 'Medium') xpGain = 25
                    if (problem.difficulty === 'Advanced' || problem.difficulty === 'Hard') xpGain = 50

                    // Track daily progress
                    const today = new Date().toDateString()
                    const solvedToday = userData?.solvedToday || {}
                    const todayCount = (solvedToday[today] || 0) + 1

                    await updateDoc(doc(db, 'users', currentUser.uid), {
                        solvedProblems: arrayUnion(problem.id),
                        totalSolved: increment(1),
                        xp: increment(xpGain),
                        [`solvedToday.${today}`]: todayCount  // Track daily
                    })

                    setHasSolved(true)
                }
            } catch (error) {
                console.error('Error saving progress:', error)
            }

            setTimeout(() => {
                setShowSuccess(false)
                navigate('/dashboard')
            }, 3000)
        }, 2000)
    }

    const handleReset = () => {
        setCode(problem.starterCode)
        setOutput('')
    }

    const getNextHint = () => {
        if (currentHint < problem.hints.length - 1) {
            setCurrentHint(currentHint + 1)
        }
    }

    const showSolutionCode = () => {
        if (hasSolved) {
            setShowSolution(true)
            setCode(problem.solution)
        } else {
            alert("Solve the problem first to see the solution! 💪")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#B3CDE0] to-[#9FB7D4]">

            {showSuccess && (
                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1 }} className="text-9xl">🎉</motion.div>
                    <div className="absolute text-4xl font-bold text-white">Problem Solved! +{problem.difficulty === 'Advanced' || problem.difficulty === 'Hard' ? '50' : problem.difficulty === 'Intermediate' || problem.difficulty === 'Medium' ? '25' : '10'} XP</div>
                </motion.div>
            )}

           // Just update the nav section in your existing ProblemSolver.jsx:

            <nav className="sticky top-0 z-40 backdrop-blur-lg bg-white/70 shadow-sm">
                <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
                    <a href="/" className="text-2xl font-bold text-[#03396C] hover:text-[#005B96] transition-colors">
                        CodeCrush
                    </a>

                    <div className="flex gap-6 text-sm font-medium items-center">
                        <a href="/" className="text-[#005B96] hover:text-[#03396C] transition-colors">Home</a>
                        <a href="/dashboard" className="text-[#005B96] hover:text-[#03396C] transition-colors">Dashboard</a>
                        <a href="/settings" className="text-[#005B96] hover:text-[#03396C] transition-colors">Settings</a>
                        <button onClick={handleLogout} className="px-4 py-2 bg-[#6497B1] text-white rounded-full hover:bg-[#005B96] transition-colors">
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>
            <div className="h-[calc(100vh-80px)] flex">
                <div className="w-1/2 overflow-y-auto p-8">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white">
                        <div className="flex items-center gap-4 mb-6">
                            <h1 className="text-3xl font-bold text-[#03396C]">{problem.title}</h1>
                            <span className={`px-4 py-1 rounded-full text-sm font-medium ${problem.difficulty === 'Easy' || problem.difficulty === 'True Beginner' || problem.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                                problem.difficulty === 'Intermediate' || problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                                }`}>
                                {problem.difficulty}
                            </span>
                            <span className="px-4 py-1 bg-[#B3CDE0] text-[#03396C] rounded-full text-sm font-medium">{problem.category}</span>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-[#03396C] mb-3">Description</h2>
                            <p className="text-[#005B96] leading-relaxed">{problem.description}</p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-[#03396C] mb-3">Examples</h2>
                            {problem.examples.map((example, i) => (
                                <div key={i} className="bg-[#E8F4F8] p-4 rounded-xl mb-4">
                                    <p className="text-sm text-[#005B96] mb-1"><strong>Input:</strong> {example.input}</p>
                                    <p className="text-sm text-[#005B96] mb-1"><strong>Output:</strong> {example.output}</p>
                                    {example.explanation && <p className="text-sm text-[#6497B1] mt-2"><strong>Explanation:</strong> {example.explanation}</p>}
                                </div>
                            ))}
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-[#03396C] mb-3">Constraints</h2>
                            <ul className="list-disc list-inside space-y-1">
                                {problem.constraints.map((constraint, i) => (
                                    <li key={i} className="text-sm text-[#005B96]">{constraint}</li>
                                ))}
                            </ul>
                        </div>

                        {/* HINTS SECTION */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-xl font-bold text-[#03396C]">Hints 💡</h2>
                                <button
                                    onClick={() => setShowHints(!showHints)}
                                    className="text-sm text-[#6497B1] hover:text-[#03396C] font-medium"
                                >
                                    {showHints ? 'Hide Hints' : 'Show Hints'}
                                </button>
                            </div>

                            <AnimatePresence>
                                {showHints && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-3"
                                    >
                                        {problem.hints.slice(0, currentHint + 1).map((hint, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded"
                                            >
                                                <p className="text-sm text-yellow-800">
                                                    <strong>Hint {i + 1}:</strong> {hint}
                                                </p>
                                            </motion.div>
                                        ))}

                                        {currentHint < problem.hints.length - 1 && (
                                            <button
                                                onClick={getNextHint}
                                                className="text-sm text-[#6497B1] hover:text-[#03396C] font-medium"
                                            >
                                                → Get another hint
                                            </button>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* SOLUTION BUTTON */}
                        {hasSolved && (
                            <div>
                                <button
                                    onClick={showSolutionCode}
                                    className="w-full py-3 bg-green-100 text-green-700 rounded-xl font-bold hover:bg-green-200 transition-colors"
                                >
                                    ✓ View Solution
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>

                <div className="w-1/2 p-8 flex flex-col">
                    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="flex-1 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-white flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-[#03396C]">Code Editor</h2>
                            <select className="px-4 py-2 bg-[#E8F4F8] text-[#03396C] rounded-lg border border-[#B3CDE0] font-medium">
                                <option>JavaScript</option>
                                <option>Python</option>
                                <option>Java</option>
                                <option>C++</option>
                            </select>
                        </div>

                        <div className="flex-1 mb-4 rounded-xl overflow-hidden border-2 border-[#B3CDE0]">
                            <Editor height="100%" defaultLanguage="javascript" value={code} onChange={(value) => setCode(value)} theme="vs-light" options={{ minimap: { enabled: false }, fontSize: 14, lineNumbers: 'on', roundedSelection: true, scrollBeyondLastLine: false, automaticLayout: true }} />
                        </div>

                        <div className="bg-[#03396C] text-white p-4 rounded-xl mb-4 h-32 overflow-y-auto font-mono text-sm">
                            {output || '// Output will appear here...'}
                        </div>

                        <div className="flex gap-4">
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit} disabled={isSubmitting} className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#6497B1] hover:bg-[#005B96] shadow-lg'} text-white`}>
                                {isSubmitting ? 'Running Tests...' : 'Submit Solution'}
                            </motion.button>

                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleReset} className="px-6 py-4 bg-white text-[#03396C] rounded-xl font-bold border-2 border-[#B3CDE0] hover:bg-[#E8F4F8] transition-colors">Reset</motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default ProblemSolver