import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { Goal, User, Habit } from 'dat';
import addGoal from './addGoal.js';

describe('addGoal', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST));
    beforeEach(() => Promise.all([Goal.deleteMany(), User.deleteMany(), Habit.deleteMany()]));

    it('succeeds on adding a new goal', () => {
        const user = new User({ name: 'Abel', email: 'abel@example.com', username: 'abelmarquez', password: 'password123' });
        const habit = new Habit({ name: 'Exercise', emoji: '🏋️', category: 'actividad física', subcategory: 'gimnasio', user: user._id });

        return Promise.all([user.save(), habit.save()])
            .then(([user, habit]) => 
                addGoal(user.id, habit.id, 'Ahorrar 100€', 'monthly', 100)
                    .then(goalId => {
                        expect(goalId).to.exist;
                        return Goal.findById(goalId);
                    })
                    .then(goal => {
                        expect(goal).to.exist;
                        expect(goal.description).to.equal('Ahorrar 100€');
                        expect(goal.period).to.equal('monthly');
                        expect(goal.user.toString()).to.equal(user.id);
                        expect(goal.habit.toString()).to.equal(habit.id);
                    })
            );
    });

    it('fails if user does not exist', () =>
        expect(
            addGoal('012345678901234567890123', '012345678901234567890123', 'Ahorrar 100€', 'monthly', 100)
        ).to.be.rejectedWith(Error, 'User not found')
    );

    after(() => db.disconnect());
});
