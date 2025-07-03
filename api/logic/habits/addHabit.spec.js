import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { Habit, User } from 'dat';
import addHabit from './addHabit.js';

describe('addHabit', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST));
    beforeEach(() => Promise.all([Habit.deleteMany(), User.deleteMany()]));

    it('succeeds on adding a new habit', () => {
        const user = new User({ name: 'Abel', email: 'abel@example.com', username: 'abelmarquez', password: 'password123' });

        return user.save()
            .then(user => 
                addHabit(user.id, 'Exercise', '🏋️', 'actividad física', 'gimnasio')
                    .then(habitId => {
                        expect(habitId).to.exist;
                        return Habit.findById(habitId);
                    })
                    .then(habit => {
                        expect(habit).to.exist;
                        expect(habit.name).to.equal('Exercise');
                        expect(habit.user.toString()).to.equal(user.id);
                    })
            );
    });

    it('fails if user does not exist', () => 
        expect(
            addHabit('012345678901234567890123', 'Exercise', '🏋️', 'actividad física', 'gimnasio')
        ).to.be.rejectedWith(Error, 'User not found')
    );

    after(() => db.disconnect());
});
