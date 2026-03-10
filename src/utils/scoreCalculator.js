/**
 * Score calculation utilities for FocusFlow
 */

// Calculate productivity score for a list of tasks
export const calculateDailyScore = (tasks) => {
    if (!tasks || tasks.length === 0) return 0;
    const completed = tasks.filter((t) => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
};

// Get motivational message based on score
export const getMotivationalMessage = (score) => {
    if (score >= 80) return { text: '🔥 Excellent! You\'re on fire!', level: 'excellent' };
    if (score >= 50) return { text: '👍 Good job! Keep pushing!', level: 'good' };
    if (score > 0) return { text: '💪 Needs Improvement. You can do it!', level: 'needs-improvement' };
    return { text: '🚀 Add tasks and start your day!', level: 'none' };
};
