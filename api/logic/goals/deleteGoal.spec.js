import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { Goal, User, Habit } from 'dat';
import deleteGoal from './deleteGoal.js';

describe('deleteGoal', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST));
    beforeEach(() => Promise.all([Goal.deleteMany(), User.deleteMany(), Habit.deleteMany()]));

    it('succeeds on deleting an existing goal', () => {
        const user = new User({ name: 'Abel', email: 'abel@example.com', username: 'abelmarquez', password: 'password123' });
        const habit = new Habit({ name: 'Exercise', emoji: '🏋️', category: 'actividad física', subcategory: 'gimnasio', user: user._id });
        const goal = new Goal({ user: user._id, habit: habit._id, description: 'Ahorrar 100€', period: 'monthly', objective: 100 });

        return Promise.all([user.save(), habit.save(), goal.save()])
            .then(([user, habit, goal]) => 
                deleteGoal(goal.id)
                    .then(() => Goal.findById(goal.id))
                    .then(deletedGoal => {
                        expect(deletedGoal).to.not.exist;
                    })
            );
    });

    it('fails if goal does not exist', () =>
        expect(deleteGoal('012345678901234567890123')).to.be.rejectedWith(Error, 'Goal not found')
    );

    after(() => db.disconnect());
});
