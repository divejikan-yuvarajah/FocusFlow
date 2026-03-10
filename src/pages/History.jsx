import DailyChart from '../components/DailyChart';
import WeeklyChart from '../components/WeeklyChart';
import MonthlyChart from '../components/MonthlyChart';
import { useTaskContext } from '../context/TaskContext';

const History = () => {
    const { allTasks } = useTaskContext();
    const totalDays = Object.keys(allTasks).length;
    const totalTasks = Object.values(allTasks).reduce((acc, tasks) => acc + tasks.length, 0);
    const totalCompleted = Object.values(allTasks).reduce(
        (acc, tasks) => acc + tasks.filter((t) => t.completed).length, 0
    );

    return (
        <div className="history-page" id="history-page">
            <div className="history-header">
                <h1>📊 Productivity History</h1>
                <p>Track your progress over time and identify productivity patterns.</p>
            </div>

            {/* Summary Cards */}
            <div className="history-stats">
                <div className="stat-card">
                    <span className="stat-icon">📅</span>
                    <span className="stat-value">{totalDays}</span>
                    <span className="stat-label">Days Tracked</span>
                </div>
                <div className="stat-card">
                    <span className="stat-icon">📝</span>
                    <span className="stat-value">{totalTasks}</span>
                    <span className="stat-label">Total Tasks</span>
                </div>
                <div className="stat-card">
                    <span className="stat-icon">✅</span>
                    <span className="stat-value">{totalCompleted}</span>
                    <span className="stat-label">Completed</span>
                </div>
                <div className="stat-card">
                    <span className="stat-icon">📈</span>
                    <span className="stat-value">
                        {totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0}%
                    </span>
                    <span className="stat-label">Overall Score</span>
                </div>
            </div>

            {/* Charts */}
            <div className="charts-container">
                <DailyChart />
                <WeeklyChart />
                <MonthlyChart />
            </div>
        </div>
    );
};

export default History;
