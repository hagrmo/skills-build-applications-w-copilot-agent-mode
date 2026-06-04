import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { apiBaseUrl, isCodespaceConfigured } from './lib/api'
import './App.css'

const navigationItems = [
  { path: '/users', label: 'Users' },
  { path: '/teams', label: 'Teams' },
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' },
]

function Overview() {
  return (
    <section className="hero-panel card border-0 shadow-sm">
      <div className="card-body p-4 p-lg-5">
        <p className="eyebrow">Octofit Tracker</p>
        <h1 className="display-5 fw-semibold mb-3">Track every workout layer from one React front end.</h1>
        <p className="lead text-secondary mb-4">
          Browse people, teams, activities, leaderboard positions, and workout plans with
          routes backed by the Node and MongoDB logic tier.
        </p>
        <div className="status-row">
          <div>
            <span className="status-label">API base</span>
            <code>{apiBaseUrl}</code>
          </div>
          <div>
            <span className="status-label">Codespace env</span>
            <span className={`badge rounded-pill ${isCodespaceConfigured ? 'text-bg-success' : 'text-bg-warning'}`}>
              {isCodespaceConfigured ? 'Configured' : 'Fallback active'}
            </span>
          </div>
        </div>
        {!isCodespaceConfigured ? (
          <div className="alert alert-warning mt-4 mb-0" role="alert">
            Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to point the
            frontend at the public Codespaces API URL. Until then, requests fall back to
            <code>http://localhost:8000/api</code>.
          </div>
        ) : null}
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow mb-2">Presentation Tier</p>
          <h1 className="app-title mb-1">Octofit Control Center</h1>
          <p className="text-secondary mb-0">
            React 19 routes for every resource exposed under the backend <code>/api</code>
            namespace.
          </p>
        </div>
        <nav className="nav nav-pills app-nav" aria-label="Octofit sections">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link${isActive ? ' active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="content-stack">
        <Overview />
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
