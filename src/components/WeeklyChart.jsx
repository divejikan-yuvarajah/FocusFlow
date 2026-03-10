import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { useTaskContext } from '../context/TaskContext';
import { getWeekData } from '../utils/dateHelpers';
import { calculateDailyScore } from '../utils/scoreCalculator';

const WeeklyChart = () => {
    const { allTasks, darkMode } = useTaskContext();
    const weeks = getWeekData();

    const data = weeks.map((week) => {
        const scores = week.days.map((date) => {
            const tasks = allTasks[date] || [];
            return tasks.length > 0 ? calculateDailyScore(tasks) : null;
        }).filter((s) => s !== null);

        const avg = scores.length > 0
            ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
            : 0;

        return {
            week: week.label,
            average: avg,
        };
    });

    const textColor = darkMode ? '#e0e0e0' : '#333';

    const getBarColor = (value) => {
        if (value >= 80) return '#4C5C2D';
        if (value >= 50) return '#6A7E3F';
        return '#D96868';
    };

    return (
        <div className="chart-card" id="weekly-chart">
            <h3>📊 Weekly Average</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#eee'} />
                    <XAxis dataKey="week" tick={{ fill: textColor, fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fill: textColor, fontSize: 12 }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: darkMode ? '#2d2d2d' : '#fff',
                            border: '1px solid #6A7E3F',
                            borderRadius: '8px',
                            color: textColor,
                        }}
                        formatter={(value) => [`${value}%`, 'Average Score']}
                    />
                    <Bar dataKey="average" radius={[8, 8, 0, 0]} barSize={50}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getBarColor(entry.average)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeeklyChart;
