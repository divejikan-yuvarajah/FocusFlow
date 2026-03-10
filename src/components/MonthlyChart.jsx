import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useTaskContext } from '../context/TaskContext';
import { getMonthData } from '../utils/dateHelpers';
import { calculateDailyScore } from '../utils/scoreCalculator';

const MonthlyChart = () => {
    const { allTasks, darkMode } = useTaskContext();
    const months = getMonthData();

    const data = months.map((month) => {
        const scores = month.days.map((date) => {
            const tasks = allTasks[date] || [];
            return tasks.length > 0 ? calculateDailyScore(tasks) : null;
        }).filter((s) => s !== null);

        const avg = scores.length > 0
            ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
            : 0;

        return {
            month: month.label,
            average: avg,
            daysTracked: scores.length,
        };
    });

    const textColor = darkMode ? '#e0e0e0' : '#333';

    return (
        <div className="chart-card" id="monthly-chart">
            <h3>📅 Monthly Trend (Last 6 Months)</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#eee'} />
                    <XAxis dataKey="month" tick={{ fill: textColor, fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fill: textColor, fontSize: 12 }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: darkMode ? '#2d2d2d' : '#fff',
                            border: '1px solid #6A7E3F',
                            borderRadius: '8px',
                            color: textColor,
                        }}
                        formatter={(value, name) => {
                            if (name === 'average') return [`${value}%`, 'Avg Score'];
                            if (name === 'daysTracked') return [value, 'Days Tracked'];
                            return [value, name];
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="average"
                        stroke="#4C5C2D"
                        strokeWidth={3}
                        dot={{ fill: '#6A7E3F', strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, fill: '#D96868' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="daysTracked"
                        stroke="#D96868"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: '#D96868', r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MonthlyChart;
