import { useTaskContext } from '../context/TaskContext';
import { calculateCurrentStreak, calculateLongestStreak } from '../utils/streakCalculator';

const StreakCard = () => {
    const { allTasks } = useTaskContext();
    const currentStreak = calculateCurrentStreak(allTasks);
    const longestStreak = calculateLongestStreak(allTasks);

    return (
        <div className="streak-card" id="streak-card">
            <h3>🔥 Streak</h3>
            <div className="streak-values">
                <div className="streak-item">
                    <span className="streak-number">{currentStreak}</span>
                    <span className="streak-label">Current</span>
                    <span className="streak-unit">day{currentStreak !== 1 ? 's' : ''}</span>
                </div>
                <div className="streak-divider"></div>
                <div className="streak-item">
                    <span className="streak-number best">{longestStreak}</span>
                    <span className="streak-label">Best</span>
                    <span className="streak-unit">day{longestStreak !== 1 ? 's' : ''}</span>
                </div>
            </div>
            {currentStreak >= 3 && (
                <div className="streak-message">
                    🌟 Great consistency! Keep it up!
                </div>
            )}
        </div>
    );
};

export default StreakCard;
