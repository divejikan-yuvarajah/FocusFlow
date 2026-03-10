import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const categoryColors = {
    Learning: '#6A7E3F',
    Health: '#D96868',
    Personal: '#7B68D9',
    Project: '#D9A868',
    Other: '#68B8D9',
};

const priorityLabels = {
    High: { color: '#D96868', icon: '🔴' },
    Medium: { color: '#D9A868', icon: '🟡' },
    Low: { color: '#6A7E3F', icon: '🟢' },
};

const TaskItem = ({ task }) => {
    const { toggleTask, deleteTask, editTask } = useTaskContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editCategory, setEditCategory] = useState(task.category);
    const [editPriority, setEditPriority] = useState(task.priority);

    const handleSave = () => {
        if (!editTitle.trim()) return;
        editTask(task.id, {
            title: editTitle.trim(),
            category: editCategory,
            priority: editPriority,
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditTitle(task.title);
        setEditCategory(task.category);
        setEditPriority(task.priority);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="task-item editing" id={`task-edit-${task.id}`}>
                <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="edit-input"
                    autoFocus
                />
                <div className="edit-row">
                    <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
                        {['Learning', 'Health', 'Personal', 'Project', 'Other'].map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)}>
                        {['High', 'Medium', 'Low'].map((p) => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>
                <div className="edit-actions">
                    <button className="save-btn" onClick={handleSave}>Save</button>
                    <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`} id={`task-${task.id}`}>
            <div className="task-left">
                <label className="checkbox-container">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        id={`checkbox-${task.id}`}
                    />
                    <span className="checkmark"></span>
                </label>
                <div className="task-info">
                    <span className={`task-title ${task.completed ? 'line-through' : ''}`}>
                        {task.title}
                    </span>
                    <div className="task-meta">
                        <span
                            className="category-badge"
                            style={{ backgroundColor: categoryColors[task.category] + '22', color: categoryColors[task.category], borderColor: categoryColors[task.category] }}
                        >
                            {task.category}
                        </span>
                        <span className="priority-badge">
                            {priorityLabels[task.priority].icon} {task.priority}
                        </span>
                    </div>
                </div>
            </div>
            <div className="task-actions">
                <button className="edit-btn" onClick={() => setIsEditing(true)} title="Edit">
                    ✏️
                </button>
                <button className="delete-btn" onClick={() => deleteTask(task.id)} title="Delete">
                    🗑️
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
