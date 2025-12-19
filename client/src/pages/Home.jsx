import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Mascot from '../components/Mascot'

function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#B3CDE0] to-[#9FB7D4]">
            {/* Animated background blobs */}
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
            <nav className="relative backdrop-blur-lg bg-white/70 shadow-sm">
                <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-[#03396C]">CodeCrush</div>

                    <div className="flex gap-6 text-sm font-medium items-center">
                        <a href="#home" className="text-[#005B96] hover:text-[#03396C] transition-colors">Home</a>
                        <a href="#features" className="text-[#005B96] hover:text-[#03396C] transition-colors">Features</a>
                        <a href="#about" className="text-[#005B96] hover:text-[#03396C] transition-colors">About</a>
                        <Link to="/login">
                            <button className="px-6 py-2 bg-[#6497B1] text-white rounded-full hover:bg-[#005B96] transition-colors">
                                Login
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="relative max-w-7xl mx-auto px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl font-bold text-[#03396C] mb-6 leading-tight">
                            Welcome to <span className="text-[#6497B1]">CodeCrush</span>...!
                        </h1>
                        <p className="text-2xl text-[#005B96] mb-8 leading-relaxed">
                            <span className="font-bold">LeetCode tests your ability.</span><br />
                            <span className="font-bold text-[#6497B1]">CodeCrush builds it.</span>
                        </p>
                        <p className="text-lg text-[#6497B1] mb-8">
                            Master coding interviews through gamified learning. Track streaks, earn XP, level up, and crush problems at your own pace.
                        </p>

                        <div className="flex gap-4">
                            <Link to="/signup">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-gradient-to-r from-[#6497B1] to-[#005B96] text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
                                    style={{ imageRendering: 'pixelated' }}
                                >
                                    Start Crushing! 🚀
                                </motion.button>
                            </Link>

                            <a href="#features">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 border-2 border-[#6497B1] text-[#6497B1] rounded-xl font-bold text-lg hover:bg-[#E8F4F8] transition-all"
                                    style={{ imageRendering: 'pixelated' }}
                                >
                                    Learn More
                                </motion.button>
                            </a>
                        </div>
                    </motion.div>

                    {/* Right: Mascot */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex justify-center"
                    >
                        <div className="relative">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-[#6497B1] to-[#B3CDE0] rounded-full blur-3xl opacity-30"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                            <Mascot state="excited" size="xlarge" message="Let's code together! 💪" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="relative max-w-7xl mx-auto px-8 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold text-[#03396C] mb-4">Why CodeCrush?</h2>
                    <p className="text-xl text-[#6497B1]">Built for pre-LeetCode learners who need confidence</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: '🎮',
                            title: 'Gamified Learning',
                            description: 'Track streaks, earn XP, level up. Stay motivated with game mechanics that make coding addictive.'
                        },
                        {
                            icon: '💡',
                            title: 'Smart Hints',
                            description: 'Progressive hint system that guides you without giving away the solution. Learn to think like a pro.'
                        },
                        {
                            icon: '🎯',
                            title: 'Personalized Path',
                            description: 'Problems matched to your skill level. Start from true beginner and progress at your own pace.'
                        },
                        {
                            icon: '📊',
                            title: 'Track Progress',
                            description: 'Visual stats, heatmaps, and achievements. See your growth in real-time.'
                        },
                        {
                            icon: '🔥',
                            title: 'Build Streaks',
                            description: 'Daily challenges keep you consistent. Build the habit that leads to interview success.'
                        },
                        {
                            icon: '📝',
                            title: 'Personal Notes',
                            description: 'Bookmark problems, add notes, use Think Mode. Make it your own learning space.'
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, y: -10 }}
                            className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white"
                            style={{ imageRendering: 'pixelated' }}
                        >
                            <div className="text-5xl mb-4">{feature.icon}</div>
                            <h3 className="text-2xl font-bold text-[#03396C] mb-3">{feature.title}</h3>
                            <p className="text-[#6497B1]">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="relative max-w-7xl mx-auto px-8 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white/80 backdrop-blur-lg p-12 rounded-3xl shadow-xl border border-white"
                >
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-[#03396C] mb-6">Our Mission</h2>
                            <p className="text-lg text-[#6497B1] mb-4 leading-relaxed">
                                CodeCrush was built for anxious learners who feel overwhelmed by LeetCode. We believe everyone deserves a chance to succeed in tech interviews.
                            </p>
                            <p className="text-lg text-[#6497B1] mb-4 leading-relaxed">
                                Instead of throwing you into the deep end, we help you build confidence through:
                            </p>
                            <ul className="space-y-2 text-[#6497B1] mb-6">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span>Problems that match YOUR level</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span>Hints that teach, not just solve</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span>Gamification that keeps you coming back</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span>A supportive learning environment</span>
                                </li>
                            </ul>

                            <Link to="/signup">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-gradient-to-r from-[#6497B1] to-[#005B96] text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
                                    style={{ imageRendering: 'pixelated' }}
                                >
                                    Join CodeCrush Today! 🎯
                                </motion.button>
                            </Link>
                        </div>

                        <div className="flex justify-center">
                            <Mascot state="happy" size="xlarge" message="You got this! 🌟" />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Stats Section */}
            <section className="relative max-w-7xl mx-auto px-8 py-20">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {[
                        { number: '30+', label: 'Coding Problems' },
                        { number: '4', label: 'Difficulty Levels' },
                        { number: '∞', label: 'Learning Potential' }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white"
                        >
                            <div className="text-6xl font-bold text-[#6497B1] mb-2">{stat.number}</div>
                            <div className="text-xl text-[#03396C] font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative max-w-7xl mx-auto px-8 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-[#6497B1] to-[#005B96] p-12 rounded-3xl shadow-2xl text-center"
                >
                    <h2 className="text-5xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
                    <p className="text-2xl text-white/90 mb-8">Join CodeCrush today and transform your coding skills!</p>

                    <Link to="/signup">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 py-5 bg-white text-[#6497B1] rounded-xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all"
                            style={{ imageRendering: 'pixelated' }}
                        >
                            Get Started Free! 🚀
                        </motion.button>
                    </Link>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="relative max-w-7xl mx-auto px-8 py-12 border-t border-white/20">
                <div className="text-center">
                    <div className="text-2xl font-bold text-[#03396C] mb-4">CodeCrush</div>
                    <p className="text-[#6497B1] mb-4">Building confidence, one problem at a time.</p>
                    <div className="flex justify-center gap-6 text-sm text-[#6497B1]">
                        <a href="#home" className="hover:text-[#03396C] transition-colors">Home</a>
                        <a href="#features" className="hover:text-[#03396C] transition-colors">Features</a>
                        <a href="#about" className="hover:text-[#03396C] transition-colors">About</a>
                        <Link to="/dashboard" className="hover:text-[#03396C] transition-colors">Dashboard</Link>
                    </div>
                    <p className="text-sm text-[#6497B1] mt-6">© 2025 CodeCrush. Built with 💙 for learners.</p>
                </div>
            </footer>
        </div>
    )
}

export default Home