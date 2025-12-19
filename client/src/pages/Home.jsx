import { TypeAnimation } from 'react-type-animation'
import { motion } from 'framer-motion'

function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#B3CDE0] to-[#9FB7D4]">

            {/* FLOATING BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-96 h-96 bg-[#6497B1] rounded-full mix-blend-multiply filter blur-xl opacity-20"
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
                    className="absolute top-40 right-10 w-96 h-96 bg-[#B3CDE0] rounded-full mix-blend-multiply filter blur-xl opacity-20"
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
                <motion.div
                    className="absolute bottom-20 left-1/3 w-96 h-96 bg-[#9FB7D4] rounded-full mix-blend-multiply filter blur-xl opacity-20"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* NAVIGATION */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 shadow-sm"
            >
                <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-[#03396C]">
                        CodeCrush
                    </div>

                    <div className="hidden md:flex gap-8 text-sm font-medium text-[#005B96]">
                        <a href="#home" className="hover:text-[#03396C] transition-colors">Home</a>
                        <a href="#features" className="hover:text-[#03396C] transition-colors">Features</a>
                        <a href="#about" className="hover:text-[#03396C] transition-colors">About</a>
                        <a href="#faq" className="hover:text-[#03396C] transition-colors">FAQ</a>
                    </div>

                    <div className="flex gap-4 text-sm font-medium">
                        <a href="/dashboard">
                            <button className="px-4 py-2 text-[#005B96] hover:text-[#03396C] transition-colors">
                                Dashboard
                            </button>
                        </a>
                        <a href="/login">
                            <button className="px-6 py-2 bg-[#6497B1] text-white rounded-full hover:bg-[#005B96] hover:shadow-lg transition-all hover:scale-105">
                                Login
                            </button>
                        </a>
                    </div>
                </div>
            </motion.nav>

            {/* HERO SECTION */}
            <section id="home" className="relative min-h-screen flex items-center justify-center px-8 py-20">
                <div className="max-w-6xl mx-auto text-center">

                    {/* Typing Animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <TypeAnimation
                            sequence={[
                                'Welcome to CodeCrush...',
                                1500,
                                'Master coding interviews...',
                                1500,
                                'No stress. Just progress.',
                                1500,
                            ]}
                            wrapper="div"
                            speed={50}
                            className="text-3xl md:text-4xl font-medium text-[#6497B1] mb-12"
                            repeat={Infinity}
                        />
                    </motion.div>

                    {/* HUGE Mascot */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="relative inline-block mb-12"
                    >
                        <motion.div
                            className="absolute inset-0 bg-[#6497B1] rounded-full blur-3xl opacity-20"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.2, 0.3, 0.2]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            animate={{
                                y: [0, -20, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative w-96 h-96 md:w-[32rem] md:h-[32rem] mx-auto bg-white/50 rounded-3xl flex items-center justify-center text-9xl shadow-2xl"
                        >
                            🐹
                        </motion.div>
                    </motion.div>

                    {/* HUGE Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-8xl md:text-9xl font-bold mb-8 text-[#03396C]"
                    >
                        CodeCrush
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-2xl md:text-3xl text-[#005B96] mb-12 max-w-4xl mx-auto leading-relaxed"
                    >
                        A cute, gamified way to master coding interviews.
                        <br />
                        Learn at your pace. Feel supported. Make progress ✨
                    </motion.p>

                    {/* CTA Button */}
                    <motion.a
                        href="/login"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-14 py-6 bg-[#6497B1] text-white text-xl font-semibold rounded-full shadow-xl hover:bg-[#005B96] transition-colors"
                        >
                            Start Learning 🚀
                        </motion.button>
                    </motion.a>

                    {/* Scroll Indicator */}
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mt-20"
                    >
                        <a href="#features" className="text-6xl text-[#6497B1] hover:text-[#005B96] transition-colors">
                            ↓
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section id="features" className="relative py-32 px-8">
                <div className="max-w-7xl mx-auto">

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-6xl font-bold text-center mb-20 text-[#03396C]"
                    >
                        Why CodeCrush?
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: '🎮', title: 'Gamified Learning', desc: 'Level up as you solve problems. Earn achievements and compete with friends!' },
                            { icon: '📊', title: 'Track Progress', desc: 'Visualize your improvement with detailed stats and streak tracking.' },
                            { icon: '🌱', title: 'Grow Your Skills', desc: 'Master data structures and algorithms through spaced repetition.' }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, duration: 0.6 }}
                                whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}
                                className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-white"
                            >
                                <div className="text-6xl mb-6">{feature.icon}</div>
                                <h3 className="text-2xl font-bold mb-4 text-[#03396C]">{feature.title}</h3>
                                <p className="text-[#005B96] leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section id="about" className="relative py-32 px-8 bg-white/30">
                <div className="max-w-5xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white/80 backdrop-blur-lg p-16 rounded-3xl shadow-2xl"
                    >
                        <h2 className="text-5xl font-bold text-center mb-8 text-[#03396C]">
                            Our Mission
                        </h2>

                        <p className="text-xl text-[#005B96] leading-relaxed text-center mb-6">
                            CodeCrush was built to make technical interview prep less intimidating and more engaging. We believe learning should be fun, not stressful.
                        </p>

                        <p className="text-xl text-[#005B96] leading-relaxed text-center">
                            Through gamification, progress tracking, and our friendly mascot companion, we help students master data structures and algorithms at their own pace.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 mt-16">
                            {[
                                { num: '500+', label: 'Active Users' },
                                { num: '1000+', label: 'Problems Solved' },
                                { num: '95%', label: 'Success Rate' }
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, type: "spring" }}
                                    className="text-center"
                                >
                                    <div className="text-5xl font-bold text-[#6497B1] mb-2">
                                        {stat.num}
                                    </div>
                                    <div className="text-[#005B96]">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section id="faq" className="relative py-32 px-8">
                <div className="max-w-4xl mx-auto">

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl font-bold text-center mb-16 text-[#03396C]"
                    >
                        Frequently Asked Questions
                    </motion.h2>

                    <div className="space-y-6">
                        {[
                            { q: 'Is CodeCrush free to use?', a: 'Yes! CodeCrush is completely free for students preparing for technical interviews.' },
                            { q: 'What topics are covered?', a: 'We cover all major data structures and algorithms: arrays, strings, trees, graphs, dynamic programming, sorting, searching, and more!' },
                            { q: 'How does the spaced repetition work?', a: 'Our algorithm tracks which problems you struggle with and brings them back at optimal intervals to maximize retention.' },
                            { q: 'Who created CodeCrush?', a: 'CodeCrush was built by a student who understands the struggle of interview prep. While applying for internships, why not make practice fun? Born from real need, built for real students.' }
                        ].map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white"
                            >
                                <h3 className="text-xl font-bold mb-3 text-[#03396C]">{faq.q}</h3>
                                <p className="text-[#005B96] leading-relaxed">{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="relative py-12 px-8 bg-[#03396C]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-12 mb-8">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4">CodeCrush</h3>
                            <p className="text-[#B3CDE0]">Making interview prep fun, one problem at a time.</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
                            <div className="space-y-2">
                                {['Home', 'Features', 'About', 'FAQ'].map((link, i) => (
                                    <div key={i}>
                                        <a href={`#${link.toLowerCase()}`} className="text-[#B3CDE0] hover:text-white transition-colors">
                                            {link}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Connect</h3>
                            <div className="space-y-2 text-[#B3CDE0]">
                                <div>
                                    <a href="mailto:malhotrasansita@gmail.com" className="hover:text-white transition-colors">
                                        📧 malhotrasansita@gmail.com
                                    </a>
                                </div>
                                <div>
                                    <a href="https://github.com/sansitamalhotra" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                        🐙 github.com/sansitamalhotra
                                    </a>
                                </div>
                                <div>
                                    <a href="https://linkedin.com/in/sansitamalhotra" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                        💼 linkedin.com/in/sansitamalhotra
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-[#6497B1] pt-8 text-center text-[#B3CDE0]">
                        © 2025 CodeCrush. Built with ❤️ by Sansa
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Home