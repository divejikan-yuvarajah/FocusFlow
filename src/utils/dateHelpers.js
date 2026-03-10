/**
 * Date utility functions for FocusFlow
 */

// Get today's date in YYYY-MM-DD format
export const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Get an array of the last N days as YYYY-MM-DD strings
export const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }
  return days;
};

// Get week-wise data (last 4 weeks)
export const getWeekData = () => {
  const weeks = [];
  for (let w = 3; w >= 0; w--) {
    const weekDays = [];
    for (let d = 6; d >= 0; d--) {
      const date = new Date();
      date.setDate(date.getDate() - (w * 7 + d));
      weekDays.push(date.toISOString().split('T')[0]);
    }
    weeks.push({
      label: `Week ${4 - w}`,
      days: weekDays,
    });
  }
  return weeks;
};

// Get month-wise data (last 6 months)
export const getMonthData = () => {
  const months = [];
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  for (let m = 5; m >= 0; m--) {
    const date = new Date();
    date.setMonth(date.getMonth() - m);
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push(dayStr);
    }
    months.push({
      label: `${monthNames[month]} ${year}`,
      days,
    });
  }
  return months;
};

// Format date string for display
export const formatDate = (dateStr) => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

// Format date for chart axis
export const formatDateShort = (dateStr) => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};
