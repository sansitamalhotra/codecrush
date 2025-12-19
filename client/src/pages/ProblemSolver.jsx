import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { doc, getDoc, updateDoc, arrayUnion, increment } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useState, useEffect } from 'react'
import { problemsDB } from '../data/problems.jsx'
import Editor from '@monaco-editor/react'
import { runTestCases, formatTestResult } from '../utils/codeRunner'
import { toggleBookmark, saveNote } from '../utils/userPreferences'
import Mascot from '../components/Mascot'

function ProblemSolver() {
    const { logout, currentUser } = useAuth()
    const navigate = useNavigate()
    const { problemId } = useParams()
    const [problem, setProblem] = useState(null)
    const [code, setCode] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)
    const [hasSolved, setHasSolved] = useState(false)
    const [showSolution, setShowSolution] = useState(false)
    const [testResults, setTestResults] = useState([])
    const [showResults, setShowResults] = useState(false)
    const [isRunning, setIsRunning] = useState(false)

    // Phase 5: Learning Tools
    const [thinkMode, setThinkMode] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [problemNote, setProblemNote] = useState('')
    const [showNotes, setShowNotes] = useState(false)
    const [isSavingNote, setIsSavingNote] = useState(false)

    // Hints
    const [currentHintLevel, setCurrentHintLevel] = useState(0)
    const [shownHints, setShownHints] = useState([])

    useEffect(() => {
        const loadProblem = async () => {
            const problemData = problemsDB[problemId]
            if (!problemData) {
                navigate('/dashboard')
                return
            }

            setProblem(problemData)
            setCode(problemData.starterCode)

            // Check if user already solved this
            if (currentUser) {
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
                const userData = userDoc.data()

                setHasSolved(userData?.solvedProblems?.includes(problemId))
                setIsBookmarked(userData?.bookmarkedProblems?.includes(problemId) || false)
                setProblemNote(userData?.problemNotes?.[problemId] || '')
                setThinkMode(userData?.thinkMode || false)
            }
        }
        loadProblem()
    }, [problemId, currentUser, navigate])

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    const handleRunTests = () => {
        setIsRunning(true)
        setShowResults(false)

        setTimeout(() => {
            try {
                const results = runTestCases(code, problem.testCases, 'javascript')
                setTestResults(results)
                setShowResults(true)
            } catch (error) {
                alert('Error running tests: ' + error.message)
            }
            setIsRunning(false)
        }, 500)
    }

    const handleGetHint = () => {
        if (currentHintLevel >= 3) {
            alert('You\'ve used all 3 hints! Try solving it now 💪')
            return
        }

        if (!problem.hints || problem.hints.length === 0) {
            alert('No hints available for this problem yet!')
            return
        }

        const hint = problem.hints[currentHintLevel]

        if (!hint) {
            alert('No more hints available!')
            return
        }

        setShownHints([...shownHints, { level: currentHintLevel + 1, text: hint }])
        setCurrentHintLevel(currentHintLevel + 1)
    }

    const handleSubmit = async () => {
        // Run all tests
        const results = runTestCases(code, problem.testCases, 'javascript')
        const allPassed = results.every(r => r.passed)

        setTestResults(results)
        setShowResults(true)

        if (!allPassed) {
            alert('❌ Some test cases failed. Fix your code and try again!')
            return
        }

        // Success!
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)

        if (!hasSolved) {
            setHasSolved(true)

            // Calculate XP based on difficulty
            const xpReward = {
                'True Beginner': 10,
                'Beginner': 10,
                'Intermediate': 25,
                'Advanced': 50
            }[problem.difficulty] || 10

            // Update Firebase
            const today = new Date().toDateString()
            await updateDoc(doc(db, 'users', currentUser.uid), {
                solvedProblems: arrayUnion(problemId),
                totalSolved: increment(1),
                xp: increment(xpReward),
                [`solvedToday.${today}`]: increment(1)
            })
        }
    }

    const handleViewSolution = () => {
        if (!hasSolved) {
            const confirmView = window.confirm(
                "⚠️ Viewing the solution will mark this problem as seen.\n\nAre you sure you want to continue?"
            )
            if (!confirmView) return
        }
        setShowSolution(true)
    }

    const handleToggleBookmark = async () => {
        try {
            await toggleBookmark(currentUser.uid, problemId, isBookmarked)
            setIsBookmarked(!isBookmarked)
        } catch (error) {
            alert('Failed to update bookmark')
        }
    }

    const handleSaveNote = async () => {
        setIsSavingNote(true)
        try {
            await saveNote(currentUser.uid, problemId, problemNote)
            setTimeout(() => setIsSavingNote(false), 1000)
        } catch (error) {
            alert('Failed to save note')
            setIsSavingNote(false)
        }
    }

    const handleToggleThinkMode = () => {
        setThinkMode(!thinkMode)
    }

    if (!problem) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#B3CDE0] to-[#9FB7D4] flex items-center justify-center">
                <div className="text-4xl text-[#03396C]">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#B3CDE0] to-[#9FB7D4]">
            {/* Success Animation */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm"
                    >
                        <Mascot state="superHappy" size="xlarge" />
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-8"
                        >
                            <div className="text-5xl font-bold text-white mb-2">Problem Solved!</div>
                            <div className="text-2xl text-white/80 text-center">
                                +{problem.difficulty === 'Advanced' ? 50 : problem.difficulty === 'Intermediate' ? 25 : 10} XP
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navigation */}
            <nav className="sticky top-0 z-40 backdrop-blur-lg bg-white/70 shadow-sm">
                <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-[#03396C] hover:text-[#005B96] transition-colors">
                        CodeCrush
                    </Link>

                    <div className="flex gap-6 text-sm font-medium items-center">
                        <Link to="/" className="text-[#005B96] hover:text-[#03396C] transition-colors">Home</Link>
                        <Link to="/dashboard" className="text-[#005B96] hover:text-[#03396C] transition-colors">Dashboard</Link>
                        <Link to="/stats" className="text-[#005B96] hover:text-[#03396C] transition-colors">Stats</Link>
                        <Link to="/settings" className="text-[#005B96] hover:text-[#03396C] transition-colors">Settings</Link>
                        <button onClick={handleLogout} className="px-4 py-2 bg-[#6497B1] text-white rounded-full hover:bg-[#005B96] transition-colors">
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-8 py-8 max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-8">

                    {/* Left: Problem Description */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h1 className="text-3xl font-bold text-[#03396C]">{problem.title}</h1>
                                <div className="flex items-center gap-2">
                                    <span className="px-4 py-2 bg-[#B3CDE0] text-[#03396C] rounded-full text-sm font-medium" style={{ imageRendering: 'pixelated' }}>
                                        {problem.difficulty}
                                    </span>

                                    {/* Bookmark Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={handleToggleBookmark}
                                        className={`p-2 rounded-full transition-colors ${isBookmarked
                                                ? 'bg-yellow-400 text-white'
                                                : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                                            }`}
                                        style={{ imageRendering: 'pixelated' }}
                                    >
                                        {isBookmarked ? '⭐' : '☆'}
                                    </motion.button>
                                </div>
                            </div>

                            <div className="mb-4">
                                <span className="px-3 py-1 bg-[#E8F4F8] text-[#005B96] rounded-full text-xs font-medium" style={{ imageRendering: 'pixelated' }}>
                                    {problem.category}
                                </span>
                            </div>

                            <div className="prose prose-sm max-w-none text-[#03396C]">
                                <p className="mb-4">{problem.description}</p>

                                <h3 className="font-bold text-lg mb-2">Examples:</h3>
                                {problem.examples.map((ex, i) => (
                                    <div key={i} className="mb-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="font-mono text-sm">
                                            <div><strong>Input:</strong> {ex.input}</div>
                                            <div><strong>Output:</strong> {ex.output}</div>
                                            {ex.explanation && <div className="text-gray-600 mt-1">{ex.explanation}</div>}
                                        </div>
                                    </div>
                                ))}

                                <h3 className="font-bold text-lg mt-4 mb-2">Constraints:</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    {problem.constraints.map((c, i) => (
                                        <li key={i}>{c}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Hints Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-lg text-[#03396C]">💡 Smart Hints</h3>
                                <button
                                    onClick={handleGetHint}
                                    disabled={currentHintLevel >= 3}
                                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{ imageRendering: 'pixelated' }}
                                >
                                    {currentHintLevel >= 3 ? '✅ All hints used' : `Get Hint ${currentHintLevel + 1}/3`}
                                </button>
                            </div>

                            {shownHints.length > 0 ? (
                                <div className="space-y-3">
                                    {shownHints.map((hint, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-400 rounded-lg"
                                        >
                                            <div className="font-bold text-sm text-purple-700 mb-2">Hint {hint.level}:</div>
                                            <div className="text-sm text-gray-700 whitespace-pre-wrap">{hint.text}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-400">
                                    <div className="text-4xl mb-2" style={{ imageRendering: 'pixelated' }}>💡</div>
                                    <p className="text-sm">Stuck? Get a progressive hint!</p>
                                </div>
                            )}
                        </motion.div>

                        {/* Personal Notes Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-lg text-[#03396C]">📝 Personal Notes</h3>
                                <button
                                    onClick={() => setShowNotes(!showNotes)}
                                    className="text-sm text-[#6497B1] hover:text-[#005B96] transition-colors"
                                >
                                    {showNotes ? 'Hide' : 'Show'}
                                </button>
                            </div>

                            <AnimatePresence>
                                {showNotes && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <textarea
                                            value={problemNote}
                                            onChange={(e) => setProblemNote(e.target.value)}
                                            placeholder="Write your thoughts, approach, or things to remember..."
                                            className="w-full h-32 p-3 border-2 border-[#E8F4F8] rounded-lg focus:border-[#6497B1] focus:outline-none resize-none text-sm"
                                            style={{ imageRendering: 'pixelated' }}
                                        />
                                        <button
                                            onClick={handleSaveNote}
                                            disabled={isSavingNote}
                                            className="mt-2 px-4 py-2 bg-[#6497B1] text-white rounded-lg hover:bg-[#005B96] transition-colors text-sm font-medium disabled:opacity-50"
                                            style={{ imageRendering: 'pixelated' }}
                                        >
                                            {isSavingNote ? '✅ Saved!' : '💾 Save Note'}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Right: Code Editor + Test Results */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-[#03396C]">Code Editor</h2>
                                <div className="flex gap-2">
                                    {/* Think Mode Toggle */}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleToggleThinkMode}
                                        className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${thinkMode
                                                ? 'bg-orange-500 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        style={{ imageRendering: 'pixelated' }}
                                    >
                                        {thinkMode ? '🧠 Think Mode ON' : '🧠 Think Mode'}
                                    </motion.button>

                                    <button
                                        onClick={handleViewSolution}
                                        className="px-4 py-2 bg-[#B3CDE0] text-[#03396C] rounded-lg hover:bg-[#9FB7D4] transition-colors text-sm font-medium"
                                        style={{ imageRendering: 'pixelated' }}
                                    >
                                        👁️ View Solution
                                    </button>
                                </div>
                            </div>

                            {thinkMode ? (
                                <div className="border-2 border-[#E8F4F8] rounded-xl p-8 bg-gradient-to-br from-orange-50 to-yellow-50 min-h-[500px] flex flex-col items-center justify-center text-center">
                                    <div className="text-6xl mb-4" style={{ imageRendering: 'pixelated' }}>🧠</div>
                                    <h3 className="text-2xl font-bold text-[#03396C] mb-2">Think Mode Active</h3>
                                    <p className="text-gray-600 mb-6 max-w-md">
                                        Take your time to think through the problem before coding.
                                        Plan your approach, consider edge cases, and work through examples.
                                    </p>
                                    <button
                                        onClick={handleToggleThinkMode}
                                        className="px-6 py-3 bg-[#6497B1] text-white rounded-xl hover:bg-[#005B96] transition-colors font-medium"
                                        style={{ imageRendering: 'pixelated' }}
                                    >
                                        Ready to Code →
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="border-2 border-[#E8F4F8] rounded-xl overflow-hidden" style={{ imageRendering: 'pixelated' }}>
                                        <Editor
                                            height="500px"
                                            defaultLanguage="javascript"
                                            value={code}
                                            onChange={(value) => setCode(value || '')}
                                            theme="vs-light"
                                            options={{
                                                fontSize: 14,
                                                minimap: { enabled: false },
                                                scrollBeyondLastLine: false,
                                                lineNumbers: 'on',
                                                roundedSelection: false,
                                                padding: { top: 16 }
                                            }}
                                        />
                                    </div>

                                    <div className="flex gap-3 mt-6">
                                        <button
                                            onClick={handleRunTests}
                                            disabled={isRunning}
                                            className="flex-1 px-6 py-3 bg-[#005B96] text-white rounded-xl hover:bg-[#03396C] transition-all font-medium disabled:opacity-50"
                                            style={{ imageRendering: 'pixelated' }}
                                        >
                                            {isRunning ? '🔄 Running...' : '▶️ Run Tests'}
                                        </button>

                                        <button
                                            onClick={handleSubmit}
                                            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#6497B1] to-[#005B96] text-white rounded-xl hover:shadow-lg transition-all font-medium"
                                            style={{ imageRendering: 'pixelated' }}
                                        >
                                            ✅ Submit Solution
                                        </button>
                                    </div>
                                </>
                            )}
                        </motion.div>

                        {/* TEST RESULTS - NOW RIGHT UNDER EDITOR! */}
                        {showResults && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg"
                            >
                                <h3 className="font-bold text-lg text-[#03396C] mb-4">
                                    Test Results ({testResults.filter(r => r.passed).length}/{testResults.length} passed)
                                </h3>

                                <div className="space-y-3">
                                    {testResults.map((result, index) => {
                                        const formatted = formatTestResult(result)
                                        return (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className={`p-4 rounded-lg border-2 ${result.passed
                                                    ? 'bg-green-50 border-green-300'
                                                    : 'bg-red-50 border-red-300'
                                                    }`}
                                                style={{ imageRendering: 'pixelated' }}
                                            >
                                                <div className="font-bold text-sm mb-2">{formatted.message}</div>
                                                <div className="text-xs space-y-1 text-gray-700">
                                                    <div>Input: <code className="bg-gray-100 px-2 py-1 rounded">{JSON.stringify(formatted.input)}</code></div>
                                                    <div>Expected: <code className="bg-gray-100 px-2 py-1 rounded">{JSON.stringify(formatted.expected)}</code></div>
                                                    <div>Got: <code className={`px-2 py-1 rounded ${result.passed ? 'bg-green-100' : 'bg-red-100'}`}>
                                                        {JSON.stringify(formatted.actual)}
                                                    </code></div>
                                                    {formatted.error && (
                                                        <div className="text-red-600 mt-2">Error: {formatted.error}</div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        )}

                        {/* SOLUTION VIEWER */}
                        {showSolution && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg"
                            >
                                <h3 className="font-bold text-lg text-[#03396C] mb-4">✅ Official Solution</h3>
                                <div className="border-2 border-[#E8F4F8] rounded-xl overflow-hidden">
                                    <pre className="p-4 bg-gray-50 overflow-x-auto text-sm">
                                        <code>{problem.solution}</code>
                                    </pre>
                                </div>
                                <button
                                    onClick={() => setCode(problem.solution)}
                                    className="mt-4 px-4 py-2 bg-[#6497B1] text-white rounded-lg hover:bg-[#005B96] transition-colors text-sm font-medium"
                                >
                                    Copy to Editor
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProblemSolver