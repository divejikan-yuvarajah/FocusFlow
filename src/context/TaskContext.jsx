import { createContext, useState, useEffect, useContext } from 'react';
import { getTodayDate } from '../utils/dateHelpers';

const TaskContext = createContext();

// Custom hook
export const useTaskContext = () => useContext(TaskContext);

// Motivational quotes
const quotes = [
    "The secret of getting ahead is getting started. – Mark Twain",
    "It always seems impossible until it's done. – Nelson Mandela",
    "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
    "The future depends on what you do today. – Mahatma Gandhi",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. – Churchill",
    "Believe you can and you're halfway there. – Theodore Roosevelt",
    "Your limitation—it's only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Stay focused and never give up.",
    "Hard work beats talent when talent doesn't work hard.",
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Discipline is the bridge between goals and accomplishment. – Jim Rohn",
    "You don't have to be great to start, but you have to start to be great. – Zig Ziglar",
];

// Sample mock data generator
const generateMockData = () => {
    const data = {};
    const categories = ['Learning', 'Health', 'Personal', 'Project', 'Other'];
    const priorities = ['High', 'Medium', 'Low'];
    const taskTitles = [
        'Study React hooks', 'Read documentation', 'Practice coding',
        'Morning workout', 'Meditation', 'Evening run',
        'Grocery shopping', 'Call family', 'Read a book',
        'Build portfolio', 'Fix bug in project', 'Deploy app',
        'Plan meals', 'Clean workspace', 'Review notes',
    ];

    for (let i = 14; i >= 1; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const numTasks = Math.floor(Math.random() * 4) + 3; // 3-6 tasks
        const tasks = [];

        for (let j = 0; j < numTasks; j++) {
            tasks.push({
                id: `${dateStr}-${j}`,
                title: taskTitles[Math.floor(Math.random() * taskTitles.length)],
                category: categories[Math.floor(Math.random() * categories.length)],
                priority: priorities[Math.floor(Math.random() * priorities.length)],
                completed: Math.random() > 0.3, // 70% chance of being completed
            });
        }
        data[dateStr] = tasks;
    }

    return data;
};

export const TaskProvider = ({ children }) => {
    const [allTasks, setAllTasks] = useState(() => {
        const stored = localStorage.getItem('focusflow_tasks');
        if (stored) {
            return JSON.parse(stored);
        }
        // Initialize with mock data for first-time users
        const mock = generateMockData();
        localStorage.setItem('focusflow_tasks', JSON.stringify(mock));
        return mock;
    });

    const [darkMode, setDarkMode] = useState(() => {
        const stored = localStorage.getItem('focusflow_darkmode');
        return stored === 'true';
    });

    const today = getTodayDate();
    const todayTasks = allTasks[today] || [];

    // Sync tasks to localStorage
    useEffect(() => {
        localStorage.setItem('focusflow_tasks', JSON.stringify(allTasks));
    }, [allTasks]);

    // Sync dark mode to localStorage
    useEffect(() => {
        localStorage.setItem('focusflow_darkmode', darkMode.toString());
        document.body.classList.toggle('dark-mode', darkMode);
    }, [darkMode]);

    // Add a task
    const addTask = (task) => {
        setAllTasks((prev) => {
            const dateTasks = prev[today] || [];
            return {
                ...prev,
                [today]: [
                    ...dateTasks,
                    {
                        ...task,
                        id: Date.now().toString(),
                        completed: false,
                    },
                ],
            };
        });
    };

    // Edit a task
    const editTask = (taskId, updatedFields) => {
        setAllTasks((prev) => {
            const dateTasks = prev[today] || [];
            return {
                ...prev,
                [today]: dateTasks.map((t) =>
                    t.id === taskId ? { ...t, ...updatedFields } : t
                ),
            };
        });
    };

    // Delete a task
    const deleteTask = (taskId) => {
        setAllTasks((prev) => {
            const dateTasks = prev[today] || [];
            return {
                ...prev,
                [today]: dateTasks.filter((t) => t.id !== taskId),
            };
        });
    };

    // Toggle task completion
    const toggleTask = (taskId) => {
        setAllTasks((prev) => {
            const dateTasks = prev[today] || [];
            return {
                ...prev,
                [today]: dateTasks.map((t) =>
                    t.id === taskId ? { ...t, completed: !t.completed } : t
                ),
            };
        });
    };

    // Toggle dark mode
    const toggleDarkMode = () => setDarkMode((prev) => !prev);

    // Export data as JSON
    const exportData = () => {
        const dataStr = JSON.stringify(allTasks, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `focusflow_backup_${today}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Reset all data
    const resetData = () => {
        setAllTasks({});
        localStorage.removeItem('focusflow_tasks');
    };

    // Get daily quote (rotates by day of year)
    const getDailyQuote = () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        return quotes[dayOfYear % quotes.length];
    };

    return (
        <TaskContext.Provider
            value={{
                allTasks,
                todayTasks,
                today,
                darkMode,
                addTask,
                editTask,
                deleteTask,
                toggleTask,
                toggleDarkMode,
                exportData,
                resetData,
                getDailyQuote,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;
