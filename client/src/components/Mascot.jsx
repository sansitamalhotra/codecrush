import { motion } from 'framer-motion'

const MASCOT_IMAGES = {
    happy: '/mascot/happy.png',
    excited: '/mascot/excited.png',
    thinking: '/mascot/thinking.png',
    sad: '/mascot/sad.png',
    superHappy: '/mascot/superHappy.png',
    onFire: '/mascot/onFire.png'
}

function Mascot({ state = 'happy', size = 'large', message }) {
    const sizeClasses = {
        small: 'w-20 h-20',
        medium: 'w-32 h-32',
        large: 'w-40 h-40',
        xlarge: 'w-56 h-56'
    }

    const animations = {
        happy: { y: [0, -10, 0] },
        excited: { y: [0, -20, 0], scale: [1, 1.1, 1] },
        thinking: { rotate: [-3, 3, -3], x: [-2, 2, -2] },
        sad: { y: [0, 5, 0] },
        superHappy: { y: [0, -15, 0], rotate: [0, 5, -5, 0], scale: [1, 1.15, 1] },
        onFire: { y: [0, -20, 0], rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }
    }

    const glowColors = {
        happy: 'bg-blue-400',
        excited: 'bg-yellow-400',
        thinking: 'bg-purple-400',
        sad: 'bg-gray-400',
        superHappy: 'bg-yellow-500',
        onFire: 'bg-orange-500'
    }

    return (
        <div className="relative flex flex-col items-center">
            {/* Glow effect */}
            <motion.div
                className={`absolute inset-0 rounded-full blur-3xl opacity-30 ${glowColors[state]}`}
                animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Mascot */}
            <motion.div
                animate={animations[state]}
                transition={{
                    duration: state === 'superHappy' || state === 'onFire' ? 2 : 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className={`relative ${sizeClasses[size]} flex items-center justify-center`}
            >
                <img
                    src={MASCOT_IMAGES[state]}
                    alt="CodeCrush Mascot"
                    className="w-full h-full object-contain drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                />
            </motion.div>

            {/* Message bubble */}
            {message && (
                <motion.div
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                    className="mt-4 bg-white px-6 py-3 rounded-2xl shadow-xl text-sm font-bold text-[#03396C] whitespace-nowrap border-2 border-[#E8F4F8]"
                    style={{ imageRendering: 'pixelated' }}
                >
                    {message}
                </motion.div>
            )}
        </div>
    )
}

export default Mascot