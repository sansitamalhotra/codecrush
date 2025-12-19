import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from '../firebase/config'

export const toggleBookmark = async (userId, problemId, isBookmarked) => {
    const userRef = doc(db, 'users', userId)

    if (isBookmarked) {
        // Remove bookmark
        await updateDoc(userRef, {
            bookmarkedProblems: arrayRemove(problemId)
        })
    } else {
        // Add bookmark
        await updateDoc(userRef, {
            bookmarkedProblems: arrayUnion(problemId)
        })
    }
}

export const saveNote = async (userId, problemId, noteText) => {
    const userRef = doc(db, 'users', userId)

    await updateDoc(userRef, {
        [`problemNotes.${problemId}`]: noteText
    })
}

export const toggleThinkMode = async (userId, enabled) => {
    const userRef = doc(db, 'users', userId)

    await updateDoc(userRef, {
        thinkMode: enabled
    })
}