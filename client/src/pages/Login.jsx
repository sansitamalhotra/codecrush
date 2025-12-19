import { useState } from 'react'
import { motion } from 'framer-motion'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [isSignUp, setIsSignUp] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            if (isSignUp) {
                // Sign up
                await createUserWithEmailAndPassword(auth, email, password)
            } else {
                // Log in
                await signInWithEmailAndPassword(auth, email, password)
            }
            // Redirect to dashboard on success
            navigate('/dashboard')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#B3CDE0] to-[#9FB7D4] flex items-center justify-center px-8">

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

            {/* Login/Signup Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-12 max-w-md w-full border border-white"
            >
                {/* Logo/Title */}
                <div className="text-center mb-8">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-8xl mb-4"
                    >
                        🐹
                    </motion.div>
                    <h1 className="text-4xl font-bold text-[#03396C] mb-2">CodeCrush</h1>
                    <p className="text-[#6497B1]">
                        {isSignUp ? 'Create your account' : 'Welcome back!'}
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4"
                    >
                        {error}
                    </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-medium text-[#03396C] mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-[#E8F4F8] border border-[#B3CDE0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6497B1] text-[#03396C]"
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-[#03396C] mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-[#E8F4F8] border border-[#B3CDE0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6497B1] text-[#03396C]"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-[#6497B1] hover:bg-[#005B96]'
                            } text-white shadow-lg`}
                    >
                        {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Log In'}
                    </motion.button>
                </form>

                {/* Toggle Sign Up/Login */}
                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setIsSignUp(!isSignUp)
                            setError('')
                        }}
                        className="text-[#6497B1] hover:text-[#03396C] font-medium transition-colors"
                    >
                        {isSignUp
                            ? 'Already have an account? Log in'
                            : "Don't have an account? Sign up"}
                    </button>
                </div>

                {/* Back to Home */}
                <div className="mt-4 text-center">
                    <a href="/" className="text-sm text-[#6497B1] hover:text-[#03396C] transition-colors">
                        ← Back to home
                    </a>
                </div>
            </motion.div>
        </div>
    )
}

export default Login