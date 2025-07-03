import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { Goal, User, Habit } from 'dat';
import updateGoal from './updateGoal.js';

describe('updateGoal', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST));
    beforeEach(() => Promise.all([Goal.deleteMany(), User.deleteMany(), Habit.deleteMany()]));

    it('succeeds on updating an existing goal', () => {
        const user = new User({ name: 'Abel', email: 'abel@example.com', username: 'abelmarquez', password: 'password123' });
        const habit = new Habit({ name: 'Exercise', emoji: '🏋️', category: 'actividad física', subcategory: 'gimnasio', user: user._id });
        const goal = new Goal({ user: user._id, habit: habit._id, description: 'Ahorrar 100€', period: 'monthly', objective: 100 });

        return Promise.all([user.save(), habit.save(), goal.save()])
            .then(([user, habit, goal]) => 
                updateGoal(goal.id, { description: 'Ahorrar 200€' })
                    .then(() => Goal.findById(goal.id))
                    .then(updatedGoal => {
                        expect(updatedGoal).to.exist;
                        expect(updatedGoal.description).to.equal('Ahorrar 200€');
                    })
            );
    });

    it('fails if goal does not exist', () =>
        expect(updateGoal('012345678901234567890123', { description: 'Ahorrar 200€' }))
            .to.be.rejectedWith(Error, 'Goal not found')
    );

    after(() => db.disconnect());
});
