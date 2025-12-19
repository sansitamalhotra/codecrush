import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { updatePassword } from 'firebase/auth'

function Settings() {
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        codingLevel: '',
        dailyGoal: ''
    })

    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        confirmPassword: ''
    })

    useEffect(() => {
        const loadUserData = async () => {
            if (currentUser) {
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
                if (userDoc.exists()) {
                    const data = userDoc.data()
                    setUserData(data)
                    setFormData({
                        name: data.name || '',
                        codingLevel: data.codingLevel || '',
                        dailyGoal: data.dailyGoal || ''
                    })
                }
                setLoading(false)
            }
        }
        loadUserData()
    }, [currentUser])

    const handleSaveProfile = async () => {
        setSaving(true)
        try {
            await updateDoc(doc(db, 'users', currentUser.uid), {
                name: formData.name,
                codingLevel: formData.codingLevel,
                dailyGoal: formData.dailyGoal
            })
            alert('Profile updated! ✅')
        } catch (error) {
            alert('Error updating profile')
            console.error(error)
        } finally {
            setSaving(false)
        }
    }

    const handleChangePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('Passwords do not match!')
            return
        }

        if (passwordData.newPassword.length < 6) {
            alert('Password must be at least 6 characters')
            return
        }

        try {
            await updatePassword(currentUser, passwordData.newPassword)
            alert('Password changed successfully! ✅')
            setPasswordData({ newPassword: '', confirmPassword: '' })
        } catch (error) {
            alert('Error changing password. Try logging out and back in.')
            console.error(error)
        }
    }

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#B3CDE0] to-[#9FB7D4] flex items-center justify-center">
                <div className="text-4xl text-[#03396C]">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#B3CDE0] to-[#9FB7D4]">

            <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 shadow-sm">
                <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
                    <a href="/" className="text-2xl font-bold text-[#03396C] hover:text-[#005B96] transition-colors">CodeCrush</a>
                    <div className="flex gap-6 text-sm font-medium items-center">
                        <a href="/" className="text-[#005B96] hover:text-[#03396C] transition-colors">Home</a>
                        <a href="/dashboard" className="text-[#005B96] hover:text-[#03396C] transition-colors">Dashboard</a>
                        <a href="/settings" className="text-[#03396C] font-bold">Settings</a>
                        <button onClick={handleLogout} className="px-4 py-2 bg-[#6497B1] text-white rounded-full hover:bg-[#005B96] transition-colors">Log Out</button>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-8 py-12 max-w-4xl">

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-10 border border-white mb-8">
                    <h1 className="text-4xl font-bold text-[#03396C] mb-8">Settings ⚙️</h1>

                    {/* Profile Settings */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-[#03396C] mb-6">Profile</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-[#03396C] mb-2">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#E8F4F8] border border-[#B3CDE0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6497B1] text-[#03396C]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#03396C] mb-2">Coding Level</label>
                                <select
                                    value={formData.codingLevel}
                                    onChange={(e) => setFormData({ ...formData, codingLevel: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#E8F4F8] border border-[#B3CDE0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6497B1] text-[#03396C]"
                                >
                                    <option value="true-beginner">True Beginner</option>
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#03396C] mb-2">Daily Goal</label>
                                <select
                                    value={formData.dailyGoal}
                                    onChange={(e) => setFormData({ ...formData, dailyGoal: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#E8F4F8] border border-[#B3CDE0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6497B1] text-[#03396C]"
                                >
                                    <option value="1">1 problem/day</option>
                                    <option value="2">2 problems/day</option>
                                    <option value="3">3 problems/day</option>
                                    <option value="5">5+ problems/day</option>
                                </select>
                            </div>

                            <button
                                onClick={handleSaveProfile}
                                disabled={saving}
                                className="w-full py-4 bg-[#6497B1] text-white rounded-xl font-bold text-lg hover:bg-[#005B96] transition-colors disabled:bg-gray-400"
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>

                    {/* Password Change */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-[#03396C] mb-6">Change Password</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-[#03396C] mb-2">New Password</label>
                                <input
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#E8F4F8] border border-[#B3CDE0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6497B1] text-[#03396C]"
                                    placeholder="At least 6 characters"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#03396C] mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#E8F4F8] border border-[#B3CDE0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6497B1] text-[#03396C]"
                                    placeholder="Re-enter password"
                                />
                            </div>

                            <button
                                onClick={handleChangePassword}
                                className="w-full py-4 bg-[#6497B1] text-white rounded-xl font-bold text-lg hover:bg-[#005B96] transition-colors"
                            >
                                Change Password
                            </button>
                        </div>
                    </div>

                    {/* Account Info */}
                    <div className="border-t border-gray-200 pt-8">
                        <h2 className="text-2xl font-bold text-[#03396C] mb-4">Account Info</h2>
                        <p className="text-[#6497B1] mb-2">Email: {currentUser?.email}</p>
                        <p className="text-[#6497B1] mb-2">Total Solved: {userData?.totalSolved || 0} problems</p>
                        <p className="text-[#6497B1]">Member since: {userData?.createdAt?.toDate?.().toLocaleDateString() || 'Unknown'}</p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Settings