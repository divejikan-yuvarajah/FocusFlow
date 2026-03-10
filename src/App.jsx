import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { TaskProvider, useTaskContext } from './context/TaskContext';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import './index.css';

const AppContent = () => {
  const { darkMode, toggleDarkMode } = useTaskContext();

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark' : 'light'}`}>
        {/* Navigation */}
        <nav className="navbar" id="main-nav">
          <div className="nav-brand">
            <span className="brand-icon">🎯</span>
            <span className="brand-text">FocusFlow</span>
          </div>
          <div className="nav-links">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end id="nav-dashboard">
              Dashboard
            </NavLink>
            <NavLink to="/history" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} id="nav-history">
              History
            </NavLink>
          </div>
          <button className="theme-toggle" onClick={toggleDarkMode} id="theme-toggle" title="Toggle Dark Mode">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>Made with ❤️ by FocusFlow • Stay productive, stay focused</p>
        </footer>
      </div>
    </Router>
  );
};

const App = () => {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
};

export default App;
