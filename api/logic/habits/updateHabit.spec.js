import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { Habit, User } from 'dat';
import updateHabit from './updateHabit.js';

describe('updateHabit', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST));
    beforeEach(() => Promise.all([Habit.deleteMany(), User.deleteMany()]));

    it('succeeds on updating an existing habit', () => {
        const user = new User({ name: 'Abel', email: 'abel@example.com', username: 'abelmarquez', password: 'password123' });
        const habit = new Habit({ name: 'Exercise', user: user._id, emoji: '🏋️' });

        return Promise.all([user.save(), habit.save()])
            .then(([user, habit]) => 
                updateHabit(habit.id, { name: 'Morning Exercise' })
                    .then(() => Habit.findById(habit.id))
                    .then(updatedHabit => {
                        expect(updatedHabit).to.exist;
                        expect(updatedHabit.name).to.equal('Morning Exercise');
                    })
            );
    });

    it('fails if habit does not exist', () =>
        expect(updateHabit('012345678901234567890123', { name: 'Morning Exercise' }))
            .to.be.rejectedWith(Error, 'Habit not found')
    );

    after(() => db.disconnect());
});
