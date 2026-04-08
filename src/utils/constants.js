// App Constants
export const APP_NAME = 'SyncStudy';
export const APP_TAGLINE = 'Study Together. Stay Consistent.';

// Timer presets (in minutes)
export const TIMER_PRESETS = {
  POMODORO: 25,
  DOUBLE: 50,
  DEEP_FOCUS: 90
};

// Session durations
export const SESSION_DURATIONS = [
  { label: '25 min (Pomodoro)', value: 25 },
  { label: '50 min (Double)', value: 50 },
  { label: '90 min (Deep focus)', value: 90 }
];

// Subject options
export const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Data Structures',
  'Web Development',
  'Machine Learning',
  'English',
  'History',
  'Economics',
  'Other'
];

// Routes
export const ROUTES = {
  LANDING: '/',
  REGISTER: '/register',
  LOGIN: '/login',
  HOME: '/home',
  SESSION: '/session/:id'
};

// Accountability check interval (milliseconds)
export const ACCOUNTABILITY_INTERVAL = 10 * 60 * 1000; // 10 minutes (demo: 10000)

// Mock data
export const MOCK_SESSIONS = [
  { id: '1', subject: 'Data Structures', participants: 3, duration: 25, creator: 'Arjun' },
  { id: '2', subject: 'Web Development', participants: 2, duration: 50, creator: 'Riya' },
  { id: '3', subject: 'Machine Learning', participants: 4, duration: 25, creator: 'Devansh' },
];

export const MOCK_PARTICIPANTS = [
  { id: 1, name: 'Arjun Mehta', isActive: true, isCreator: true },
  { id: 2, name: 'Riya Sharma', isActive: true, isCreator: false },
  { id: 3, name: 'Devansh K', isActive: false, isCreator: false },
  { id: 4, name: 'Priya Singh', isActive: true, isCreator: false },
];

export const MOCK_CHAT_MESSAGES = [
  { id: 1, user: 'Arjun', text: 'Hey! Ready to study?', timestamp: '10:30 AM', isOwn: false },
  { id: 2, user: 'You', text: 'Yes! Lets focus 💪', timestamp: '10:31 AM', isOwn: true },
  { id: 3, user: 'Riya', text: "I'm here too! 📚", timestamp: '10:32 AM', isOwn: false },
];
