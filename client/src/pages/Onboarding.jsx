import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

function Onboarding() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        name: '',
        codingLevel: '',
        goal: '',
        dailyGoal: ''
    })
    const [loading, setLoading] = useState(false)
    const { currentUser } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Save user profile to Firestore
            await setDoc(doc(db, 'users', currentUser.uid), {
                name: formData.name,
                email: currentUser.email,
                codingLevel: formData.codingLevel,
                goal: formData.goal,
                dailyGoal: formData.dailyGoal,
                createdAt: new Date(),
                streak: 0,
                totalSolved: 0,
                level: 1,
                xp: 0,
                solvedProblems: []
            })

            // Redirect to dashboard
            navigate('/dashboard')
        } catch (error) {
            console.error('Error saving profile:', error)
            alert('Error saving profile. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const nextStep = () => setStep(step + 1)
    const prevStep = () => setStep(step - 1)

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#B3CDE0] to-[#9FB7D4] flex items-center justify-center px-8 py-12">

            {/* Background blobs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-96 h-96 bg-[#6497B1] rounded-full mix-blend-multiply filter blur-xl opacity-20"
                    animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-[#B3CDE0] rounded-full mix-blend-multiply filter blur-xl opacity-20"
                    animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Onboarding Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-12 max-w-2xl w-full border border-white"
            >
                {/* Progress bar */}
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className={`w-1/4 h-2 rounded-full mx-1 transition-colors ${i <= step ? 'bg-[#6497B1]' : 'bg-gray-200'
                                    }`}
                            />
                        ))}
                    </div>
                    <p className="text-sm text-[#6497B1] text-center">
                        Step {step} of 4
                    </p>
                </div>

                <form onSubmit={handleSubmit}>

                    {/* STEP 1: Name */}
                    {step === 1 && (
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <div className="text-center mb-8">
                                <div className="text-8xl mb-4">👋</div>
                                <h2 className="text-3xl font-bold text-[#03396C] mb-2">
                                    Welcome to CodeCrush!
                                </h2>
                                <p className="text-[#6497B1]">Let's personalize your experience</p>
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-[#03396C] mb-3">
                                    What should we call you?
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full px-6 py-4 bg-[#E8F4F8] border border-[#B3CDE0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6497B1] text-[#03396C] text-lg"
                                    placeholder="Your name"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={nextStep}
                                disabled={!formData.name}
                                className="w-full mt-8 py-4 bg-[#6497B1] text-white rounded-xl font-bold text-lg hover:bg-[#005B96] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                Next →
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 2: Coding Level */}
                    {step === 2 && (
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <div className="text-center mb-8">
                                <div className="text-8xl mb-4">💻</div>
                                <h2 className="text-3xl font-bold text-[#03396C] mb-2">
                                    What's your coding level?
                                </h2>
                                <p className="text-[#6497B1]">Be honest - we'll match you with the right problems!</p>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { value: 'true-beginner', label: 'True Beginner', desc: 'Just learning to code' },
                                    { value: 'beginner', label: 'Beginner', desc: 'Know basics, new to DSA' },
                                    { value: 'intermediate', label: 'Intermediate', desc: 'Comfortable with DSA concepts' },
                                    { value: 'advanced', label: 'Advanced', desc: 'Strong DSA, prepping for FAANG' }
                                ].map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, codingLevel: option.value })}
                                        className={`w-full p-6 rounded-xl border-2 text-left transition-all ${formData.codingLevel === option.value
                                                ? 'border-[#6497B1] bg-[#E8F4F8]'
                                                : 'border-[#B3CDE0] hover:border-[#6497B1]'
                                            }`}
                                    >
                                        <div className="font-bold text-lg text-[#03396C]">{option.label}</div>
                                        <div className="text-sm text-[#6497B1]">{option.desc}</div>
                                    </button>
                                ))}
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="w-1/3 py-4 bg-white text-[#03396C] rounded-xl font-bold border-2 border-[#B3CDE0] hover:bg-[#E8F4F8] transition-colors"
                                >
                                    ← Back
                                </button>
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={!formData.codingLevel}
                                    className="w-2/3 py-4 bg-[#6497B1] text-white rounded-xl font-bold text-lg hover:bg-[#005B96] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    Next →
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: Goal */}
                    {step === 3 && (
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <div className="text-center mb-8">
                                <div className="text-8xl mb-4">🎯</div>
                                <h2 className="text-3xl font-bold text-[#03396C] mb-2">
                                    What are you preparing for?
                                </h2>
                                <p className="text-[#6497B1]">We'll customize your learning path</p>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { value: 'internship', label: 'Internship', emoji: '🎓' },
                                    { value: 'new-grad', label: 'New Grad Role', emoji: '💼' },
                                    { value: 'career-switch', label: 'Career Switch', emoji: '🔄' },
                                    { value: 'just-learning', label: 'Just Learning', emoji: '📚' }
                                ].map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, goal: option.value })}
                                        className={`w-full p-6 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${formData.goal === option.value
                                                ? 'border-[#6497B1] bg-[#E8F4F8]'
                                                : 'border-[#B3CDE0] hover:border-[#6497B1]'
                                            }`}
                                    >
                                        <div className="text-4xl">{option.emoji}</div>
                                        <div className="font-bold text-lg text-[#03396C]">{option.label}</div>
                                    </button>
                                ))}
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="w-1/3 py-4 bg-white text-[#03396C] rounded-xl font-bold border-2 border-[#B3CDE0] hover:bg-[#E8F4F8] transition-colors"
                                >
                                    ← Back
                                </button>
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={!formData.goal}
                                    className="w-2/3 py-4 bg-[#6497B1] text-white rounded-xl font-bold text-lg hover:bg-[#005B96] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    Next →
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 4: Daily Goal */}
                    {step === 4 && (
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <div className="text-center mb-8">
                                <div className="text-8xl mb-4">⏰</div>
                                <h2 className="text-3xl font-bold text-[#03396C] mb-2">
                                    Daily practice goal
                                </h2>
                                <p className="text-[#6497B1]">How many problems per day?</p>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { value: '1', label: '1 problem/day', desc: 'Light & consistent' },
                                    { value: '2', label: '2 problems/day', desc: 'Steady progress' },
                                    { value: '3', label: '3 problems/day', desc: 'Serious prep' },
                                    { value: '5', label: '5+ problems/day', desc: 'Grind mode 🔥' }
                                ].map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, dailyGoal: option.value })}
                                        className={`w-full p-6 rounded-xl border-2 text-left transition-all ${formData.dailyGoal === option.value
                                                ? 'border-[#6497B1] bg-[#E8F4F8]'
                                                : 'border-[#B3CDE0] hover:border-[#6497B1]'
                                            }`}
                                    >
                                        <div className="font-bold text-lg text-[#03396C]">{option.label}</div>
                                        <div className="text-sm text-[#6497B1]">{option.desc}</div>
                                    </button>
                                ))}
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="w-1/3 py-4 bg-white text-[#03396C] rounded-xl font-bold border-2 border-[#B3CDE0] hover:bg-[#E8F4F8] transition-colors"
                                >
                                    ← Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={!formData.dailyGoal || loading}
                                    className="w-2/3 py-4 bg-[#6497B1] text-white rounded-xl font-bold text-lg hover:bg-[#005B96] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Saving...' : "Let's Go! 🚀"}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </form>
            </motion.div>
        </div>
    )
}

export default Onboarding