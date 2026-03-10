import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const categories = ['Learning', 'Health', 'Personal', 'Project', 'Other'];
const priorities = ['High', 'Medium', 'Low'];

const TaskForm = () => {
    const { addTask } = useTaskContext();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Learning');
    const [priority, setPriority] = useState('Medium');
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        addTask({ title: title.trim(), category, priority });
        setTitle('');
        setCategory('Learning');
        setPriority('Medium');
        setIsOpen(false);
    };

    return (
        <div className="task-form-wrapper">
            {!isOpen ? (
                <button className="add-task-btn" onClick={() => setIsOpen(true)} id="add-task-toggle">
                    <span className="plus-icon">+</span> Add New Task
                </button>
            ) : (
                <form className="task-form" onSubmit={handleSubmit} id="task-form">
                    <div className="form-header">
                        <h3>New Task</h3>
                        <button type="button" className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="task-title">Task Title</label>
                        <input
                            type="text"
                            id="task-title"
                            placeholder="What do you need to do?"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="task-category">Category</label>
                            <select id="task-category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                {categories.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="task-priority">Priority</label>
                            <select id="task-priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                                {priorities.map((p) => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="submit-btn" id="submit-task-btn">
                        Add Task
                    </button>
                </form>
            )}
        </div>
    );
};

export default TaskForm;
