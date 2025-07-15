import 'dotenv/config';
import { expect } from 'chai';
import db, { User, Habit, Goal } from 'dat';
import addGoal from './addGoal.js';

describe('addGoal', () => {
    let testUser, testHabit;

    before(async () => {
        await db.connect(process.env.MONGO_URL_TEST);
    });

    beforeEach(async () => {
        await Goal.deleteMany();
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

    it('should add a new goal successfully', async () => {
        const goalData = {
            name: 'Ahorrar 100€',
            period: 'monthly',
            objective: 100,
            targetDays: 30
        };

        const goal = await addGoal(
            testUser._id.toString(),
            testHabit._id.toString(),
            goalData
        );

        expect(goal).to.exist;
        expect(goal.name).to.equal(goalData.name);
        expect(goal.period).to.equal(goalData.period);
        expect(goal.objective).to.equal(goalData.objective);
        expect(goal.targetDays).to.equal(goalData.targetDays);
        expect(goal.user.toString()).to.equal(testUser._id.toString());
        expect(goal.habit.toString()).to.equal(testHabit._id.toString());
        expect(goal.completedCount).to.equal(0);
    });

    it('should fail when required fields are missing', async () => {
        const incompleteGoalData = {
            name: 'Test Goal',
            period: 'monthly'
            // missing objective and targetDays
        };

        try {
            await addGoal(
                testUser._id.toString(),
                testHabit._id.toString(),
                incompleteGoalData
            );
            throw new Error('Should have failed');
        } catch (error) {
            expect(error.message).to.include('Todos los campos son requeridos');
        }
    });

    it('should fail when objective is not positive', async () => {
        const goalData = {
            name: 'Test Goal',
            period: 'monthly',
            objective: 0, // not positive
            targetDays: 30
        };

        try {
            await addGoal(
                testUser._id.toString(),
                testHabit._id.toString(),
                goalData
            );
            throw new Error('Should have failed');
        } catch (error) {
            expect(error.message).to.include('Todos los campos son requeridos');
        }
    });

    it('should fail when targetDays is not positive', async () => {
        const goalData = {
            name: 'Test Goal',
            period: 'monthly',
            objective: 100,
            targetDays: -5 // not positive
        };

        try {
            await addGoal(
                testUser._id.toString(),
                testHabit._id.toString(),
                goalData
            );
            throw new Error('Should have failed');
        } catch (error) {
            expect(error.message).to.include('El período de días debe ser un número positivo');
        }
    });

    it('should calculate endDate correctly based on targetDays', async () => {
        const goalData = {
            name: 'Test Goal',
            period: 'weekly',
            objective: 50,
            targetDays: 7
        };

        const goal = await addGoal(
            testUser._id.toString(),
            testHabit._id.toString(),
            goalData
        );

        const expectedEndDate = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000));
        const actualEndDate = new Date(goal.endDate);
        
        // Allow 1 second difference for test execution time
        expect(Math.abs(actualEndDate.getTime() - expectedEndDate.getTime())).to.be.lessThan(1000);
    });
});
