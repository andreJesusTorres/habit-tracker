import db, { User, Habit, Goal, Progress, Event } from 'dat';

export const setupTestDatabase = async () => {
    await db.connect(process.env.MONGO_URL_TEST);
};

export const cleanupTestDatabase = async () => {
    await db.disconnect();
};

export const clearAllCollections = async () => {
    await Promise.all([
        User.deleteMany(),
        Habit.deleteMany(),
        Goal.deleteMany(),
        Progress.deleteMany(),
        Event.deleteMany()
    ]);
};

export const createTestData = async () => {
    // Create test user
    const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        username: 'testuser',
        password: 'hashedpassword123'
    });
    await user.save();

    // Create test habit
    const habit = new Habit({
        name: 'Exercise',
        category: 'actividad física',
        subcategory: 'gimnasio',
        emoji: '🏋️',
        user: user._id
    });
    await habit.save();

    return { user, habit };
};

export const expectError = (promise, expectedErrorType, expectedMessage) => {
    return expect(promise).to.be.rejectedWith(expectedErrorType, expectedMessage);
};

export const expectValidationError = (promise, fieldName) => {
    return expect(promise).to.be.rejectedWith(Error, new RegExp(fieldName, 'i'));
};

export const expectNotFoundError = (promise, entityName) => {
    return expect(promise).to.be.rejectedWith(Error, new RegExp(entityName, 'i'));
}; 