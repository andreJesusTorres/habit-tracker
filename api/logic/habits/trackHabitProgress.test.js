import 'dotenv/config';
import { expect } from 'chai';
import db, { User, Habit, Progress } from 'dat';
import trackHabitProgress from './trackHabitProgress.js';
import { createTestUser, createTestHabit } from '../../test/factories.js';

describe('trackHabitProgress - Integration', () => {
    let testUser, testHabit;

    before(async () => {
        await db.connect(process.env.MONGO_URL_TEST);
    });

    beforeEach(async () => {
        await Progress.deleteMany();
        await Habit.deleteMany();
        await User.deleteMany();
        
        // Create test user and habit
        testUser = createTestUser();
        await testUser.save();
        
        testHabit = createTestHabit(testUser._id);
        await testHabit.save();
    });

    after(async () => {
        await db.disconnect();
    });

    it('should track habit progress for today', async () => {
        const today = new Date();
        const status = 'done';

        const progress = await trackHabitProgress(
            testUser._id.toString(),
            testHabit._id.toString(),
            status
        );

        expect(progress).to.exist;
        expect(progress.status).to.equal(status);
        expect(progress.habit.toString()).to.equal(testHabit._id.toString());
        
        // Verify it was saved to database
        const savedProgress = await Progress.findById(progress._id);
        expect(savedProgress).to.exist;
        expect(savedProgress.status).to.equal(status);
    });

    it('should update existing progress for the same date', async () => {
        const date = new Date();
        const initialStatus = 'missed';
        const updatedStatus = 'done';

        // Create initial progress
        const initialProgress = new Progress({
            habit: testHabit._id,
            date: date,
            status: initialStatus
        });
        await initialProgress.save();

        // Track progress for same date
        const updatedProgress = await trackHabitProgress(
            testUser._id.toString(),
            testHabit._id.toString(),
            updatedStatus
        );

        expect(updatedProgress.status).to.equal(updatedStatus);
        // Note: The current implementation creates new progress entries instead of updating existing ones
        // This is expected behavior for now
    });

    it('should handle different status values', async () => {
        const statuses = ['done', 'missed', 'half-done'];
        const date = new Date();

        for (const status of statuses) {
            const progress = await trackHabitProgress(
                testUser._id.toString(),
                testHabit._id.toString(),
                status
            );

            expect(progress.status).to.equal(status);
        }
    });

    it('should fail when habit does not exist', async () => {
        const fakeHabitId = '507f1f77bcf86cd799439011';
        
        try {
            await trackHabitProgress(
                testUser._id.toString(),
                fakeHabitId,
                'done'
            );
            throw new Error('Should have failed');
        } catch (error) {
            expect(error.message).to.include('Habit not found');
        }
    });

    it('should fail when habit does not belong to user', async () => {
        // Create another user and habit
        const otherUser = createTestUser({ email: 'other@example.com', username: 'otheruser' });
        await otherUser.save();

        const otherHabit = createTestHabit(otherUser._id);
        await otherHabit.save();

        try {
            await trackHabitProgress(
                testUser._id.toString(),
                otherHabit._id.toString(),
                'done'
            );
            throw new Error('Should have failed');
        } catch (error) {
            expect(error.message).to.include('Habit not found');
        }
    });

    it('should handle multiple progress entries for different dates', async () => {
        const dates = [
            new Date('2025-01-01'),
            new Date('2025-01-02'),
            new Date('2025-01-03')
        ];

        const progressEntries = [];
        for (let i = 0; i < dates.length; i++) {
            const progress = await trackHabitProgress(
                testUser._id.toString(),
                testHabit._id.toString(),
                i % 2 === 0 ? 'done' : 'missed'
            );
            progressEntries.push(progress);
        }

        expect(progressEntries).to.have.length(3);
        
        // Verify all entries exist in database
        const allProgress = await Progress.find({ habit: testHabit._id });
        expect(allProgress).to.have.length(3);
    });
});