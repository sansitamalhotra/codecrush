import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import Mascot from '../components/Mascot'

function Onboarding() {
    const navigate = useNavigate()
    const { signup } = useAuth()
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        codingLevel: 'beginner',
        dailyGoal: '1'
    })

    const handleNext = () => {
        if (step === 1 && !formData.name) {
            alert('Please enter your name')
            return
        }
        if (step === 2 && (!formData.email || !formData.password)) {
            alert('Please enter email and password')
            return
        }
        if (step < 4) {
            setStep(step + 1)
        }
    }

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1)
        }
    }

    const handleSubmit = async () => {
        setLoading(true)

        try {
            // Create user in Firebase Auth
            const userCredential = await signup(formData.email, formData.password)

            // Create user document in Firestore with ALL fields
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                name: formData.name,
                email: formData.email,
                codingLevel: formData.codingLevel,
                dailyGoal: formData.dailyGoal,
                createdAt: new Date(),

                // Stats & Progress
                streak: 0,
                totalSolved: 0,
                solvedProblems: [],
                xp: 0,
                level: 1,
                lastLoginDate: new Date(),
                solvedToday: {},

                // Phase 5: Learning Tools
                bookmarkedProblems: [],
                problemNotes: {},
                thinkMode: false
            })

            navigate('/dashboard')
        } catch (error) {
            alert(error.message)
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#B3CDE0] to-[#9FB7D4] flex items-center justify-center p-8">
            {/* Animated background blobs */}
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

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-md w-full border border-white"
            >
                {/* Progress bar */}
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        {[1, 2, 3, 4].map((s) => (
                            <div
                                key={s}
                                className={`w-1/4 h-2 rounded-full mx-1 transition-all ${s <= step ? 'bg-[#6497B1]' : 'bg-gray-200'
                                    }`}
                            />
                        ))}
                    </div>
                    <p className="text-sm text-[#6497B1] text-center">Step {step} of 4</p>
                </div>

                <AnimatePresence mode="wait">
                    {/* Step 1: Name */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="flex justify-center mb-6">
                                <Mascot state="excited" size="medium" />
                            </div>
                            <h2 className="text-3xl font-bold text-[#03396C] mb-2">Welcome! 👋</h2>
                            <p className="text-[#6497B1] mb-6">Let's get you started on your coding journey</p>

                            <input
                                type="text"
                                placeholder="What's your name?"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                                className="w-full px-4 py-3 border-2 border-[#E8F4F8] rounded-xl focus:border-[#6497B1] focus:outline-none text-lg"
                                autoFocus
                            />
                        </motion.div>
                    )}

                    {/* Step 2: Email & Password */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h2 className="text-3xl font-bold text-[#03396C] mb-2">Create Account 🔐</h2>
                            <p className="text-[#6497B1] mb-6">We'll keep your progress safe</p>

                            <div className="space-y-4">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-[#E8F4F8] rounded-xl focus:border-[#6497B1] focus:outline-none"
                                />
                                <input
                                    type="password"
                                    placeholder="Password (min 6 characters)"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-[#E8F4F8] rounded-xl focus:border-[#6497B1] focus:outline-none"
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Coding Level */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h2 className="text-3xl font-bold text-[#03396C] mb-2">Your Level 📊</h2>
                            <p className="text-[#6497B1] mb-6">We'll match you with the right problems</p>

                            <div className="space-y-3">
                                {[
                                    { value: 'true-beginner', label: 'True Beginner', desc: 'Just starting out' },
                                    { value: 'beginner', label: 'Beginner', desc: 'Know basic syntax' },
                                    { value: 'intermediate', label: 'Intermediate', desc: 'Comfortable with DSA' },
                                    { value: 'advanced', label: 'Advanced', desc: 'Ready for hard problems' }
                                ].map((level) => (
                                    <button
                                        key={level.value}
                                        onClick={() => setFormData({ ...formData, codingLevel: level.value })}
                                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${formData.codingLevel === level.value
                                                ? 'border-[#6497B1] bg-[#E8F4F8]'
                                                : 'border-gray-200 hover:border-[#B3CDE0]'
                                            }`}
                                    >
                                        <div className="font-bold text-[#03396C]">{level.label}</div>
                                        <div className="text-sm text-[#6497B1]">{level.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 4: Daily Goal */}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h2 className="text-3xl font-bold text-[#03396C] mb-2">Daily Goal 🎯</h2>
                            <p className="text-[#6497B1] mb-6">Consistency is key!</p>

                            <div className="space-y-3">
                                {[
                                    { value: '1', label: '1 problem/day', desc: 'Perfect for beginners' },
                                    { value: '2', label: '2 problems/day', desc: 'Build momentum' },
                                    { value: '3', label: '3 problems/day', desc: 'Serious learner' },
                                    { value: '5', label: '5+ problems/day', desc: 'Interview prep mode' }
                                ].map((goal) => (
                                    <button
                                        key={goal.value}
                                        onClick={() => setFormData({ ...formData, dailyGoal: goal.value })}
                                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${formData.dailyGoal === goal.value
                                                ? 'border-[#6497B1] bg-[#E8F4F8]'
                                                : 'border-gray-200 hover:border-[#B3CDE0]'
                                            }`}
                                    >
                                        <div className="font-bold text-[#03396C]">{goal.label}</div>
                                        <div className="text-sm text-[#6497B1]">{goal.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation buttons */}
                <div className="flex gap-3 mt-8">
                    {step > 1 && (
                        <button
                            onClick={handleBack}
                            className="flex-1 px-6 py-3 border-2 border-[#6497B1] text-[#6497B1] rounded-xl hover:bg-[#E8F4F8] transition-all font-medium"
                        >
                            Back
                        </button>
                    )}

                    {step < 4 ? (
                        <button
                            onClick={handleNext}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#6497B1] to-[#005B96] text-white rounded-xl hover:shadow-lg transition-all font-medium"
                        >
                            Next →
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#6497B1] to-[#005B96] text-white rounded-xl hover:shadow-lg transition-all font-medium disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Start Coding! 🚀'}
                        </button>
                    )}
                </div>

                {/* Login link */}
                <p className="text-center text-sm text-[#6497B1] mt-6">
                    Already have an account?{' '}
                    <a href="/login" className="font-bold text-[#03396C] hover:underline">
                        Log in
                    </a>
                </p>
            </motion.div>
        </div>
    )
}

export default Onboarding   