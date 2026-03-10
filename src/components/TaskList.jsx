import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList = () => {
    const { todayTasks } = useTaskContext();
    const [filter, setFilter] = useState('All');
    const [sortBy, setSortBy] = useState('default');

    let filteredTasks = [...todayTasks];

    // Filter
    if (filter === 'Active') {
        filteredTasks = filteredTasks.filter((t) => !t.completed);
    } else if (filter === 'Completed') {
        filteredTasks = filteredTasks.filter((t) => t.completed);
    }

    // Sort
    if (sortBy === 'priority') {
        const priorityOrder = { High: 0, Medium: 1, Low: 2 };
        filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sortBy === 'category') {
        filteredTasks.sort((a, b) => a.category.localeCompare(b.category));
    }

    const total = todayTasks.length;
    const completed = todayTasks.filter((t) => t.completed).length;

    return (
        <div className="task-list-wrapper" id="task-list-section">
            <div className="task-list-header">
                <h2>
                    Today's Tasks
                    <span className="task-count">{completed}/{total}</span>
                </h2>
                <div className="task-controls">
                    <div className="filter-group">
                        {['All', 'Active', 'Completed'].map((f) => (
                            <button
                                key={f}
                                className={`filter-btn ${filter === f ? 'active' : ''}`}
                                onClick={() => setFilter(f)}
                                id={`filter-${f.toLowerCase()}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <select
                        className="sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        id="sort-select"
                    >
                        <option value="default">Default</option>
                        <option value="priority">Priority</option>
                        <option value="category">Category</option>
                    </select>
                </div>
            </div>

            {filteredTasks.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">📋</div>
                    <p>{total === 0 ? 'No tasks yet. Add your first task!' : 'No matching tasks.'}</p>
                </div>
            ) : (
                <div className="task-list">
                    {filteredTasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
