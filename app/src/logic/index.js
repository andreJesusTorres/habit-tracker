import {
    addHabit,
    getHabits,
    updateHabit,
    deleteHabit
} from './habits';

import {
    addGoal,
    getGoals,
    updateGoal,
    deleteGoal
} from './goals';

import {
    addProgress,
    getProgress,
    deleteProgress
} from './progress';

import {
    getUserName,
    getUserId,
    loginUser,
    logoutUser,
    registerUser
} from './users';

import {
    addEvent,
    getEvents,
    updateEvent,
    deleteEvent
} from './events';

const logic = {
    // Habits
    addHabit,
    getHabits,
    updateHabit,
    deleteHabit,

    // Goals
    addGoal,
    getGoals,
    updateGoal,
    deleteGoal,

    // Progress
    addProgress,
    getProgress,
    deleteProgress,

    // Users
    getUserName,
    getUserId,
    loginUser,
    logoutUser,
    registerUser,

    // Events
    addEvent,
    getEvents,
    updateEvent,
    deleteEvent
};

export default logic;