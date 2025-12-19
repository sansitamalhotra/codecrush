import { useState } from 'react'
import { motion } from 'framer-motion'
import Editor from '@monaco-editor/react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

function ProblemSolver() {
    const { id } = useParams()
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    // Problem database
    const problems = {
        'two-sum': {
            title: "Two Sum",
            difficulty: "Easy",
            category: "Arrays",
            description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
            examples: [
                {
                    input: "nums = [2,7,11,15], target = 9",
                    output: "[0,1]",
                    explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
                },
                {
                    input: "nums = [3,2,4], target = 6",
                    output: "[1,2]"
                }
            ],
            constraints: [
                "2 <= nums.length <= 10^4",
                "-10^9 <= nums[i] <= 10^9",
                "Only one valid answer exists"
            ],
            starterCode: "// Write your solution here\nfunction twoSum(nums, target) {\n  \n}"
        },
        'valid-parentheses': {
            title: "Valid Parentheses",
            difficulty: "Easy",
            category: "Stack",
            description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets, and open brackets must be closed in the correct order.",
            examples: [
                {
                    input: 's = "()"',
                    output: "true"
                },
                {
                    input: 's = "()[]{}"',
                    output: "true"
                },
                {
                    input: 's = "(]"',
                    output: "false"
                }
            ],
            constraints: [
                "1 <= s.length <= 10^4",
                "s consists of parentheses only '()[]{}'."
            ],
            starterCode: "// Write your solution here\nfunction isValid(s) {\n  \n}"
        },
        'merge-sorted-lists': {
            title: "Merge Two Sorted Lists",
            difficulty: "Medium",
            category: "Linked List",
            description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
            examples: [
                {
                    input: "list1 = [1,2,4], list2 = [1,3,4]",
                    output: "[1,1,2,3,4,4]"
                },
                {
                    input: "list1 = [], list2 = []",
                    output: "[]"
                }
            ],
            constraints: [
                "The number of nodes in both lists is in the range [0, 50]",
                "-100 <= Node.val <= 100",
                "Both list1 and list2 are sorted in non-decreasing order"
            ],
            starterCode: "// Write your solution here\nfunction mergeTwoLists(list1, list2) {\n  \n}"
        }
    }

    const problem = problems[id] || problems['two-sum']

    const [code, setCode] = useState(problem.starterCode)
    const [output, setOutput] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const handleSubmit = () => {
        setIsSubmitting(true)
        setOutput('Running tests...')

        setTimeout(() => {
            setOutput('✅ Test 1 Passed\n✅ Test 2 Passed\n\n🎉 All tests passed!')
            setIsSubmitting(false)
            setShowSuccess(true)

            setTimeout(() => setShowSuccess(false), 3000)
        }, 2000)
    }

    const handleReset = () => {
        setCode(problem.starterCode)
        setOutput('')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#B3CDE0] to-[#9FB7D4]">

            {/* Success Animation Overlay */}
            {showSuccess && (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1 }}
                        className="text-9xl"
                    >
                        🎉
                    </motion.div>
                    <div className="absolute text-4xl font-bold text-white">
                        Problem Solved! +50 XP
                    </div>
                </motion.div>
            )}

            {/* Navigation */}
            <nav className="sticky top-0 z-40 backdrop-blur-lg bg-white/70 shadow-sm">
                <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-[#03396C]">CodeCrush</div>
                    <div className="flex gap-6 text-sm font-medium">
                        <a href="/" className="text-[#005B96] hover:text-[#03396C] transition-colors">Home</a>
                        <a href="/dashboard" className="text-[#005B96] hover:text-[#03396C] transition-colors">Dashboard</a>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-[#6497B1] text-white rounded-full hover:bg-[#005B96] transition-colors"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content - Split Screen */}
            <div className="h-[calc(100vh-80px)] flex">

                {/* LEFT SIDE - Problem Description */}
                <div className="w-1/2 overflow-y-auto p-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white"
                    >
                        {/* Problem Header */}
                        <div className="flex items-center gap-4 mb-6">
                            <h1 className="text-3xl font-bold text-[#03396C]">{problem.title}</h1>
                            <span className={`px-4 py-1 rounded-full text-sm font-medium ${problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                    problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                }`}>
                                {problem.difficulty}
                            </span>
                            <span className="px-4 py-1 bg-[#B3CDE0] text-[#03396C] rounded-full text-sm font-medium">
                                {problem.category}
                            </span>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-[#03396C] mb-3">Description</h2>
                            <p className="text-[#005B96] leading-relaxed">{problem.description}</p>
                        </div>

                        {/* Examples */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-[#03396C] mb-3">Examples</h2>
                            {problem.examples.map((example, i) => (
                                <div key={i} className="bg-[#E8F4F8] p-4 rounded-xl mb-4">
                                    <p className="text-sm text-[#005B96] mb-1">
                                        <strong>Input:</strong> {example.input}
                                    </p>
                                    <p className="text-sm text-[#005B96] mb-1">
                                        <strong>Output:</strong> {example.output}
                                    </p>
                                    {example.explanation && (
                                        <p className="text-sm text-[#6497B1] mt-2">
                                            <strong>Explanation:</strong> {example.explanation}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Constraints */}
                        <div>
                            <h2 className="text-xl font-bold text-[#03396C] mb-3">Constraints</h2>
                            <ul className="list-disc list-inside space-y-1">
                                {problem.constraints.map((constraint, i) => (
                                    <li key={i} className="text-sm text-[#005B96]">{constraint}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT SIDE - Code Editor */}
                <div className="w-1/2 p-8 flex flex-col">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-white flex flex-col"
                    >
                        {/* Editor Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-[#03396C]">Code Editor</h2>
                            <select className="px-4 py-2 bg-[#E8F4F8] text-[#03396C] rounded-lg border border-[#B3CDE0] font-medium">
                                <option>JavaScript</option>
                                <option>Python</option>
                                <option>Java</option>
                                <option>C++</option>
                            </select>
                        </div>

                        {/* Monaco Editor */}
                        <div className="flex-1 mb-4 rounded-xl overflow-hidden border-2 border-[#B3CDE0]">
                            <Editor
                                height="100%"
                                defaultLanguage="javascript"
                                value={code}
                                onChange={(value) => setCode(value)}
                                theme="vs-light"
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    lineNumbers: 'on',
                                    roundedSelection: true,
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                }}
                            />
                        </div>

                        {/* Output Console */}
                        <div className="bg-[#03396C] text-white p-4 rounded-xl mb-4 h-32 overflow-y-auto font-mono text-sm">
                            {output || '// Output will appear here...'}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all ${isSubmitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-[#6497B1] hover:bg-[#005B96] shadow-lg'
                                    } text-white`}
                            >
                                {isSubmitting ? 'Running Tests...' : 'Submit Solution'}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleReset}
                                className="px-6 py-4 bg-white text-[#03396C] rounded-xl font-bold border-2 border-[#B3CDE0] hover:bg-[#E8F4F8] transition-colors"
                            >
                                Reset
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default ProblemSolver