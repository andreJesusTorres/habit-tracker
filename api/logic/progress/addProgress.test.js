import 'dotenv/config';
import { expect } from 'chai';
import db, { User, Habit, Progress } from 'dat';
import addProgress from './addProgress.js';

describe('addProgress', () => {
    let testUser, testHabit;

    before(async () => {
        await db.connect(process.env.MONGO_URL_TEST);
    });

    beforeEach(async () => {
        await Progress.deleteMany();
        await Habit.deleteMany();
        await User.deleteMany();
        
        // Create test user
        testUser = new User({
            name: 'Test User',
            email: 'test@example.com',
            username: 'testuser',
            password: 'hashedpassword123'
        });
        await testUser.save();

        // Create test habit
        testHabit = new Habit({
            name: 'Exercise',
            category: 'actividad física',
            subcategory: 'gimnasio',
            emoji: '🏋️',
            user: testUser._id
        });
        await testHabit.save();
    });

    after(async () => {
        await db.disconnect();
    });

    it('should add new progress successfully', async () => {
        const progressData = {
            date: new Date(),
            status: 'done'
        };

        const progressId = await addProgress(
            testUser._id.toString(),
            testHabit._id.toString(),
            progressData.date,
            progressData.status
        );

        expect(progressId).to.exist;
        
        const savedProgress = await Progress.findById(progressId);
        expect(savedProgress).to.exist;
        expect(savedProgress.status).to.equal(progressData.status);
        expect(savedProgress.habit.toString()).to.equal(testHabit._id.toString());
    });

    it('should update existing progress for the same date', async () => {
        const date = new Date();
        const initialStatus = 'missed';
        const updatedStatus = 'done';

        // Add initial progress
        await addProgress(
            testUser._id.toString(),
            testHabit._id.toString(),
            date,
            initialStatus
        );

        // Update progress for same date
        const progressId = await addProgress(
            testUser._id.toString(),
            testHabit._id.toString(),
            date,
            updatedStatus
        );

        const savedProgress = await Progress.findById(progressId);
        expect(savedProgress.status).to.equal(updatedStatus);
        
        // Should only have one progress entry for this date
        const allProgress = await Progress.find({
            habit: testHabit._id,
            date: {
                $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
            }
        });
        expect(allProgress).to.have.length(1);
    });

    it('should fail when habit does not exist', async () => {
        const fakeHabitId = '507f1f77bcf86cd799439011';
        
        try {
            await addProgress(
                testUser._id.toString(),
                fakeHabitId,
                new Date(),
                'done'
            );
            throw new Error('Should have failed');
        } catch (error) {
            expect(error.message).to.include('Habit not found');
        }
    });

    it('should fail when habit does not belong to user', async () => {
        // Create another user and habit
        const otherUser = new User({
            name: 'Other User',
            email: 'other@example.com',
            username: 'otheruser',
            password: 'hashedpassword123'
        });
        await otherUser.save();

        const otherHabit = new Habit({
            name: 'Other Habit',
            category: 'actividad física',
            subcategory: 'gimnasio',
            emoji: '🏋️',
            user: otherUser._id
        });
        await otherHabit.save();

        try {
            await addProgress(
                testUser._id.toString(),
                otherHabit._id.toString(),
                new Date(),
                'done'
            );
            throw new Error('Should have failed');
        } catch (error) {
            expect(error.message).to.include('Habit not found');
        }
    });

    it('should handle different status values', async () => {
        const statuses = ['done', 'missed', 'half-done'];
        
        for (const status of statuses) {
            const progressId = await addProgress(
                testUser._id.toString(),
                testHabit._id.toString(),
                new Date(),
                status
            );

            const savedProgress = await Progress.findById(progressId);
            expect(savedProgress.status).to.equal(status);
        }
    });
});