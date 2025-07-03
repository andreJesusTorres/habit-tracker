import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { Habit, User } from 'dat';
import getHabits from './getHabits.js';

describe('getHabits', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST));
    beforeEach(() => Promise.all([Habit.deleteMany(), User.deleteMany()]));

    it('succeeds on getting all habits for a user', () => {
        const user = new User({ name: 'Abel', email: 'abel@example.com', username: 'abelmarquez', password: 'password123' });
        const habits = [
            { name: 'Exercise', user: user._id, emoji: '🏋️', category: 'actividad física', subcategory: 'gimnasio' },
            { name: 'Read', user: user._id, emoji: '📚', category: 'desarrollo personal', subcategory: 'lectura' }
        ];

        return Promise.all([user.save(), Habit.insertMany(habits)])
            .then(([user]) => 
                getHabits(user.id)
                    .then(fetchedHabits => {
                        expect(fetchedHabits).to.have.lengthOf(2);
                        expect(fetchedHabits[0].name).to.equal('Exercise');
                        expect(fetchedHabits[1].name).to.equal('Read');
                    })
            );
    });

    it('fails if user does not exist', () =>
        expect(getHabits('012345678901234567890123')).to.be.rejectedWith(Error, 'User not found')
    );

    after(() => db.disconnect());
});
