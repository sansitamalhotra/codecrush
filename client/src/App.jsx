import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import ProblemSolver from './pages/ProblemSolver'
import Login from './pages/Login'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/problem/:id" element={<ProblemSolver />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App