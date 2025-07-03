import {
    registerUser,
    authenticateUser,
    getUserName
} from './users/index.js'


import {
    addHabit,
    deleteHabit,
    getHabits,
    trackHabitProgress,
    updateHabit
} from './habits/index.js'

import {
    addGoal,
    deleteGoal,
    updateGoal,
    getGoals
} from './goals/index.js'

import {
    addProgress,
    deleteProgress,
    getProgress,
    updateProgress
} from './progress/index.js'

import {
    addEvent,
    deleteEvent,
    getEvents,
    updateEvent
} from './events/index.js'

const logic = {
    registerUser,
    authenticateUser,
    getUserName,

    addHabit,
    deleteHabit,
    getHabits,
    trackHabitProgress,
    updateHabit,

    addGoal,
    updateGoal,
    deleteGoal,
    getGoals,

    addProgress,
    deleteProgress,
    updateProgress,
    getProgress,

    addEvent,
    deleteEvent,
    updateEvent,
    getEvents
}

export default logic 

