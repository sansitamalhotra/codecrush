// Utility functions for streak tracking

export const checkAndUpdateStreak = async (userId, db, updateDoc, doc, increment) => {
    try {
        const userDoc = await db.collection('users').doc(userId).get()
        const userData = userDoc.data()

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const lastLogin = userData.lastLoginDate?.toDate() || null

        if (!lastLogin) {
            // First time login
            await updateDoc(doc(db, 'users', userId), {
                streak: 1,
                lastLoginDate: today
            })
            return { streak: 1, isNewDay: true }
        }

        const lastLoginDate = new Date(lastLogin)
        lastLoginDate.setHours(0, 0, 0, 0)

        const daysDiff = Math.floor((today - lastLoginDate) / (1000 * 60 * 60 * 24))

        if (daysDiff === 0) {
            // Same day - no update needed
            return { streak: userData.streak, isNewDay: false }
        } else if (daysDiff === 1) {
            // Next day - increment streak
            await updateDoc(doc(db, 'users', userId), {
                streak: increment(1),
                lastLoginDate: today
            })
            return { streak: userData.streak + 1, isNewDay: true }
        } else {
            // Missed days - reset streak
            await updateDoc(doc(db, 'users', userId), {
                streak: 1,
                lastLoginDate: today
            })
            return { streak: 1, isNewDay: true, streakBroken: true }
        }
    } catch (error) {
        console.error('Error updating streak:', error)
        return { streak: 0, isNewDay: false }
    }
}

export const calculateLevel = (xp) => {
    // Level up every 100 XP
    return Math.floor(xp / 100) + 1
}

export const getXPForNextLevel = (xp) => {
    const currentLevel = calculateLevel(xp)
    const xpForNextLevel = currentLevel * 100
    return xpForNextLevel - xp
}

export const getXPProgress = (xp) => {
    const currentLevelBaseXP = (calculateLevel(xp) - 1) * 100
    const xpInCurrentLevel = xp - currentLevelBaseXP
    return (xpInCurrentLevel / 100) * 100 // Percentage
}