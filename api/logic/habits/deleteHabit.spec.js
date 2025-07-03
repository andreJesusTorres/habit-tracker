import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { Habit, User } from 'dat';
import deleteHabit from './deleteHabit.js';

describe('deleteHabit', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST));
    beforeEach(() => Promise.all([Habit.deleteMany(), User.deleteMany()]));

    it('succeeds on deleting a habit', () => {
        const user = new User({ name: 'Abel', email: 'abel@example.com', username: 'abelmarquez', password: 'password123' });
        const habit = new Habit({ name: 'Exercise', user: user._id, emoji: '🏋️', category: 'actividad física', subcategory: 'gimnasio' });

        return Promise.all([user.save(), habit.save()])
            .then(([user, habit]) => 
                deleteHabit(habit.id)
                    .then(() => Habit.findById(habit.id))
                    .then(deletedHabit => {
                        expect(deletedHabit).to.not.exist;
                    })
            );
    });

    it('fails if habit does not exist', () => 
        expect(deleteHabit('012345678901234567890123')).to.be.rejectedWith(Error, 'Habit not found')
    );

    after(() => db.disconnect());
});
