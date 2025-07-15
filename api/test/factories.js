import { User, Habit, Goal, Progress, Event } from 'dat';

export const createTestUser = (overrides = {}) => {
    const defaultUser = {
        name: 'Test User',
        email: 'test@example.com',
        username: 'testuser',
        password: 'hashedpassword123',
        role: 'regular'
    };
    
    return new User({ ...defaultUser, ...overrides });
};

export const createTestHabit = (userId, overrides = {}) => {
    const defaultHabit = {
        name: 'Exercise',
        category: 'actividad física',
        subcategory: 'gimnasio',
        emoji: '🏋️',
        user: userId
    };
    
    return new Habit({ ...defaultHabit, ...overrides });
};

export const createTestGoal = (userId, habitId, overrides = {}) => {
    const defaultGoal = {
        user: userId,
        habit: habitId,
        name: 'Test Goal',
        period: 'monthly',
        objective: 100,
        targetDays: 30,
        startDate: new Date(),
        endDate: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)),
        completedCount: 0
    };
    
    return new Goal({ ...defaultGoal, ...overrides });
};

export const createTestProgress = (habitId, overrides = {}) => {
    const defaultProgress = {
        date: new Date(),
        status: 'done',
        habit: habitId
    };
    
    return new Progress({ ...defaultProgress, ...overrides });
};

export const createTestEvent = (userId, overrides = {}) => {
    const defaultEvent = {
        name: 'Test Event',
        description: 'Test event description',
        startDate: new Date('2025-01-30T10:00:00.000Z'),
        endDate: new Date('2025-01-30T11:00:00.000Z'),
        frequency: 'once',
        user: userId
    };
    
    return new Event({ ...defaultEvent, ...overrides });
};

export const generateRandomId = () => {
    return '507f1f77bcf86cd799439011';
};

export const generateRandomEmail = () => {
    return `test${Date.now()}@example.com`;
};

export const generateRandomUsername = () => {
    return `user${Date.now()}`;
}; 