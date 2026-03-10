import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart,
} from 'recharts';
import { useTaskContext } from '../context/TaskContext';
import { getLast7Days, formatDateShort } from '../utils/dateHelpers';
import { calculateDailyScore } from '../utils/scoreCalculator';

const DailyChart = () => {
    const { allTasks, darkMode } = useTaskContext();
    const last7 = getLast7Days();

    const data = last7.map((date) => {
        const tasks = allTasks[date] || [];
        return {
            date: formatDateShort(date),
            score: calculateDailyScore(tasks),
            tasks: tasks.length,
            completed: tasks.filter((t) => t.completed).length,
        };
    });

    const textColor = darkMode ? '#e0e0e0' : '#333';

    return (
        <div className="chart-card" id="daily-chart">
            <h3>📈 Daily Productivity (Last 7 Days)</h3>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6A7E3F" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#6A7E3F" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#eee'} />
                    <XAxis dataKey="date" tick={{ fill: textColor, fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fill: textColor, fontSize: 12 }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: darkMode ? '#2d2d2d' : '#fff',
                            border: '1px solid #6A7E3F',
                            borderRadius: '8px',
                            color: textColor,
                        }}
                        formatter={(value, name) => {
                            if (name === 'score') return [`${value}%`, 'Score'];
                            return [value, name];
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#6A7E3F"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorScore)"
                        dot={{ fill: '#4C5C2D', strokeWidth: 2, r: 5 }}
                        activeDot={{ r: 7, fill: '#D96868' }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DailyChart;
