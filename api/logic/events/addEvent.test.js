import 'dotenv/config';
import { expect } from 'chai';
import db, { User, Event } from 'dat';
import addEvent from './addEvent.js';

describe('addEvent', () => {
    let testUser;

    before(async () => {
        await db.connect(process.env.MONGO_URL_TEST);
    });

    beforeEach(async () => {
        await Event.deleteMany();
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

    it('should add a new event successfully', async () => {
        const eventData = {
            name: 'Team Meeting',
            startDate: new Date('2025-01-30T10:00:00.000Z'),
            description: 'Weekly team meeting',
            endDate: new Date('2025-01-30T11:00:00.000Z'),
            frequency: 'weekly'
        };

        const eventId = await addEvent(
            testUser._id.toString(),
            eventData.name,
            eventData.startDate,
            eventData.description,
            eventData.endDate,
            eventData.frequency
        );

        expect(eventId).to.exist;
        
        const savedEvent = await Event.findById(eventId);
        expect(savedEvent).to.exist;
        expect(savedEvent.name).to.equal(eventData.name);
        expect(savedEvent.description).to.equal(eventData.description);
        expect(savedEvent.frequency).to.equal(eventData.frequency);
        expect(savedEvent.user.toString()).to.equal(testUser._id.toString());
    });

    it('should add event with default values', async () => {
        const eventData = {
            name: 'Simple Event',
            startDate: new Date('2025-01-30T10:00:00.000Z'),
            description: 'A simple event'
            // endDate and frequency will use defaults
        };

        const eventId = await addEvent(
            testUser._id.toString(),
            eventData.name,
            eventData.startDate,
            eventData.description
        );

        const savedEvent = await Event.findById(eventId);
        expect(savedEvent.endDate).to.be.null;
        expect(savedEvent.frequency).to.equal('once');
    });

    it('should fail when user does not exist', async () => {
        const fakeUserId = '507f1f77bcf86cd799439011';
        
        try {
            await addEvent(
                fakeUserId,
                'Test Event',
                new Date('2025-01-30T10:00:00.000Z'),
                'Test description'
            );
            throw new Error('Should have failed');
        } catch (error) {
            expect(error.message).to.include('User not found');
        }
    });

    it('should handle different frequency values', async () => {
        const frequencies = ['once', 'daily', 'weekly', 'monthly'];
        
        for (const frequency of frequencies) {
            const eventId = await addEvent(
                testUser._id.toString(),
                `Event ${frequency}`,
                new Date('2025-01-30T10:00:00.000Z'),
                `Test ${frequency} event`,
                null,
                frequency
            );

            const savedEvent = await Event.findById(eventId);
            expect(savedEvent.frequency).to.equal(frequency);
        }
    });

    it('should validate required fields', async () => {
        try {
            await addEvent(
                testUser._id.toString(),
                '', // empty name
                new Date('2025-01-30T10:00:00.000Z'),
                'Test description'
            );
            throw new Error('Should have failed');
        } catch (error) {
            expect(error.message).to.include('longitud de texto inválida');
        }
    });
});
