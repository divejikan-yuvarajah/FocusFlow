import { useTaskContext } from '../context/TaskContext';
import { calculateDailyScore, getMotivationalMessage } from '../utils/scoreCalculator';

const ScoreCard = () => {
    const { todayTasks } = useTaskContext();
    const score = calculateDailyScore(todayTasks);
    const { text, level } = getMotivationalMessage(score);
    const completed = todayTasks.filter((t) => t.completed).length;
    const total = todayTasks.length;

    return (
        <div className={`score-card ${level}`} id="score-card">
            <div className="score-header">
                <h3>Productivity Score</h3>
                <span className="score-value">{score}%</span>
            </div>
            <div className="progress-bar-container">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${score}%` }}
                >
                    <div className="progress-bar-glow"></div>
                </div>
            </div>
            <div className="score-details">
                <span className="tasks-progress">{completed} of {total} tasks completed</span>
                <span className={`motivation-text ${level}`}>{text}</span>
            </div>
        </div>
    );
};

export default ScoreCard;
