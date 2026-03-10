/**
 * Streak calculation utilities for FocusFlow
 */

import { calculateDailyScore } from './scoreCalculator';

// Calculate current streak (consecutive days with score >= 70%)
export const calculateCurrentStreak = (allTasks) => {
    let streak = 0;
    const today = new Date();

    for (let i = 0; i < 365; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const tasks = allTasks[dateStr];

        if (!tasks || tasks.length === 0) {
            // If it's today and no tasks yet, skip
            if (i === 0) continue;
            break;
        }

        const score = calculateDailyScore(tasks);
        if (score >= 70) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
};

// Calculate longest streak ever
export const calculateLongestStreak = (allTasks) => {
    // Get all dates and sort them
    const dates = Object.keys(allTasks).sort();
    if (dates.length === 0) return 0;

    let longestStreak = 0;
    let currentStreak = 0;

    // Check every date from the first task date to today
    const startDate = new Date(dates[0] + 'T00:00:00');
    const endDate = new Date();
    const tempDate = new Date(startDate);

    while (tempDate <= endDate) {
        const dateStr = tempDate.toISOString().split('T')[0];
        const tasks = allTasks[dateStr];

        if (tasks && tasks.length > 0) {
            const score = calculateDailyScore(tasks);
            if (score >= 70) {
                currentStreak++;
                longestStreak = Math.max(longestStreak, currentStreak);
            } else {
                currentStreak = 0;
            }
        } else {
            currentStreak = 0;
        }

        tempDate.setDate(tempDate.getDate() + 1);
    }

    return longestStreak;
};
