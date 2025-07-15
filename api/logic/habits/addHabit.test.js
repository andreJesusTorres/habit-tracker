import 'dotenv/config';
import { expect } from 'chai';
import db, { User, Habit } from 'dat';
import addHabit from './addHabit.js';

describe('addHabit', () => {
    let testUser;

    before(async () => {
        await db.connect(process.env.MONGO_URL_TEST);
    });

    beforeEach(async () => {
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
    });

    after(async () => {
        await db.disconnect();
    });

    it('should add a new habit successfully', async () => {
        const habitData = {
            name: 'Exercise',
            category: 'actividad física',
            subcategory: 'gimnasio',
            emoji: '🏋️'
        };

        const habit = await addHabit(
            testUser._id.toString(),
            habitData.name,
            habitData.category,
            habitData.subcategory,
            habitData.emoji
        );

        expect(habit).to.exist;
        expect(habit.name).to.equal(habitData.name);
        expect(habit.category).to.equal(habitData.category);
        expect(habit.subcategory).to.equal(habitData.subcategory);
        expect(habit.emoji).to.equal(habitData.emoji);
        expect(habit.user.toString()).to.equal(testUser._id.toString());
    });

    it('should fail when user does not exist', async () => {
        const fakeUserId = '507f1f77bcf86cd799439011';
        
        try {
            await addHabit(
                fakeUserId,
                'Exercise',
                'actividad física',
                'gimnasio',
                '🏋️'
            );
            throw new Error('Should have failed');
        } catch (error) {
            expect(error.message).to.include('usuario no encontrado');
        }
    });

    it('should fail when user has 10 or more habits', async () => {
        // Create 10 habits for the user
        const habits = [];
        for (let i = 0; i < 10; i++) {
            const habit = new Habit({
                name: `Habit ${i}`,
                category: 'actividad física',
                subcategory: 'gimnasio',
                emoji: '🏋️',
                user: testUser._id
            });
            habits.push(habit);
        }
        await Habit.insertMany(habits);

        // Try to add 11th habit
        try {
            await addHabit(
                testUser._id.toString(),
                '11th Habit',
                'actividad física',
                'gimnasio',
                '🏋️'
            );
            throw new Error('Should have failed');
        } catch (error) {
            expect(error.message).to.include('Solo puedes tener hasta 10 hábitos activos por día');
        }
    });

    it('should validate required fields', async () => {
        try {
            await addHabit(
                testUser._id.toString(),
                '', // empty name
                'actividad física',
                'gimnasio',
                '🏋️'
            );
            throw new Error('Should have failed');
        } catch (error) {
            expect(error.message).to.include('longitud de nombre inválida');
        }
    });
});
