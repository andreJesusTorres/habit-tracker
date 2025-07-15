import 'dotenv/config';
import { expect } from 'chai';
import db, { User } from 'dat';
import registerUser from './registerUser.js';

describe('registerUser', () => {
    before(async () => {
        await db.connect(process.env.MONGO_URL_TEST);
    });

    beforeEach(async () => {
        await User.deleteMany();
    });

    after(async () => {
        await db.disconnect();
    });

    it('should register a new user successfully', async () => {
        const userData = {
            name: 'Test User',
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123',
            passwordRepeat: 'password123'
        };

        await registerUser(
            userData.name,
            userData.email,
            userData.username,
            userData.password,
            userData.passwordRepeat
        );

        const savedUser = await User.findOne({ email: userData.email });
        expect(savedUser).to.exist;
        expect(savedUser.name).to.equal(userData.name);
        expect(savedUser.username).to.equal(userData.username);
        expect(savedUser.password).to.not.equal(userData.password); // Should be hashed
    });

    it('should fail when passwords do not match', async () => {
        const userData = {
            name: 'Test User',
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123',
            passwordRepeat: 'differentpassword'
        };

        try {
            await registerUser(
                userData.name,
                userData.email,
                userData.username,
                userData.password,
                userData.passwordRepeat
            );
            throw new Error('Should have failed');
        } catch (error) {
            expect(error.message).to.include('las contraseñas no coinciden');
        }
    });

    it('should fail when user already exists', async () => {
        const userData = {
            name: 'Test User',
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123',
            passwordRepeat: 'password123'
        };

        // Register first user
        await registerUser(
            userData.name,
            userData.email,
            userData.username,
            userData.password,
            userData.passwordRepeat
        );

        // Try to register same user again
        try {
            await registerUser(
                userData.name,
                userData.email,
                userData.username,
                userData.password,
                userData.passwordRepeat
            );
            throw new Error('Should have failed');
        } catch (error) {
            expect(error.message).to.include('el usuario ya existe');
        }
    });
});
