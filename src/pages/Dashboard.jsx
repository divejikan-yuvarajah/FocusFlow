import { useState, useEffect, useRef } from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import ScoreCard from '../components/ScoreCard';
import StreakCard from '../components/StreakCard';
import { formatDate } from '../utils/dateHelpers';

const Dashboard = () => {
    const { today, getDailyQuote, exportData, resetData } = useTaskContext();

    // Pomodoro Timer
    const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes
    const [pomodoroActive, setPomodoroActive] = useState(false);
    const [pomodoroCompleted, setPomodoroCompleted] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (pomodoroActive && pomodoroTime > 0) {
            intervalRef.current = setInterval(() => {
                setPomodoroTime((prev) => prev - 1);
            }, 1000);
        } else if (pomodoroTime === 0) {
            setPomodoroActive(false);
            setPomodoroCompleted(true);
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [pomodoroActive, pomodoroTime]);

    const togglePomodoro = () => {
        if (pomodoroCompleted) {
            setPomodoroTime(25 * 60);
            setPomodoroCompleted(false);
            return;
        }
        setPomodoroActive((prev) => !prev);
    };

    const resetPomodoro = () => {
        setPomodoroActive(false);
        setPomodoroCompleted(false);
        setPomodoroTime(25 * 60);
        clearInterval(intervalRef.current);
    };

    const formatTimer = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const pomodoroPercent = ((25 * 60 - pomodoroTime) / (25 * 60)) * 100;

    const [showResetConfirm, setShowResetConfirm] = useState(false);

    const handleReset = () => {
        resetData();
        setShowResetConfirm(false);
    };

    return (
        <div className="dashboard" id="dashboard-page">
            {/* Header Section */}
            <div className="dashboard-header">
                <div className="header-text">
                    <h1>Welcome to FocusFlow</h1>
                    <p className="date-display">📅 {formatDate(today)}</p>
                    <p className="daily-quote">💬 "{getDailyQuote()}"</p>
                </div>
            </div>

            {/* Stats Row */}
            <div className="stats-row">
                <ScoreCard />
                <StreakCard />

                {/* Pomodoro Timer Card */}
                <div className={`pomodoro-card ${pomodoroCompleted ? 'completed' : ''}`} id="pomodoro-timer">
                    <h3>🍅 Pomodoro Timer</h3>
                    <div className="pomodoro-display">
                        <div className="timer-circle">
                            <svg viewBox="0 0 100 100">
                                <circle className="timer-bg" cx="50" cy="50" r="45" />
                                <circle
                                    className="timer-progress"
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    strokeDasharray={`${pomodoroPercent * 2.83} ${283 - pomodoroPercent * 2.83}`}
                                    strokeDashoffset="0"
                                    transform="rotate(-90 50 50)"
                                />
                            </svg>
                            <span className="timer-text">
                                {pomodoroCompleted ? '✅ Done!' : formatTimer(pomodoroTime)}
                            </span>
                        </div>
                    </div>
                    <div className="pomodoro-controls">
                        <button className="pomodoro-btn start" onClick={togglePomodoro} id="pomodoro-start">
                            {pomodoroCompleted ? 'Restart' : pomodoroActive ? 'Pause' : 'Start'}
                        </button>
                        <button className="pomodoro-btn reset" onClick={resetPomodoro} id="pomodoro-reset">
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Task Section */}
            <TaskForm />
            <TaskList />

            {/* Action Buttons */}
            <div className="action-buttons">
                <button className="action-btn export" onClick={exportData} id="export-btn">
                    📥 Export Data
                </button>
                <button
                    className="action-btn reset-btn"
                    onClick={() => setShowResetConfirm(true)}
                    id="reset-btn"
                >
                    🗑️ Reset All Data
                </button>
            </div>

            {/* Reset Confirmation Modal */}
            {showResetConfirm && (
                <div className="modal-overlay" id="reset-modal">
                    <div className="modal">
                        <h3>⚠️ Reset All Data?</h3>
                        <p>This will permanently delete all your tasks, scores, and streaks. This action cannot be undone.</p>
                        <div className="modal-actions">
                            <button className="modal-btn confirm" onClick={handleReset}>
                                Yes, Reset Everything
                            </button>
                            <button className="modal-btn cancel" onClick={() => setShowResetConfirm(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
