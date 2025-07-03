import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { Goal, User, Habit } from 'dat';
import getGoals from './getGoals.js';

describe('getGoals', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST));
    beforeEach(() => Promise.all([Goal.deleteMany(), User.deleteMany(), Habit.deleteMany()]));

    it('succeeds on getting all goals for a user', () => {
        const user = new User({ name: 'Abel', email: 'abel@example.com', username: 'abelmarquez', password: 'password123' });
        const habit = new Habit({ name: 'Exercise', emoji: '🏋️', category: 'actividad física', subcategory: 'gimnasio', user: user._id });
        const goals = [
            { user: user._id, habit: habit._id, description: 'Ahorrar 100€', period: 'monthly', objective: 100 },
            { user: user._id, habit: habit._id, description: 'Correr 10km', period: 'weekly', objective: 10 }
        ];

        return Promise.all([user.save(), habit.save(), Goal.insertMany(goals)])
            .then(([user, habit]) => 
                getGoals(user.id)
                    .then(fetchedGoals => {
                        expect(fetchedGoals).to.have.lengthOf(2);
                        expect(fetchedGoals[0].description).to.equal('Ahorrar 100€');
                        expect(fetchedGoals[1].description).to.equal('Correr 10km');
                    })
            );
    });

    it('fails if user does not exist', () =>
        expect(getGoals('012345678901234567890123')).to.be.rejectedWith(Error, 'User not found')
    );

    after(() => db.disconnect());
});
