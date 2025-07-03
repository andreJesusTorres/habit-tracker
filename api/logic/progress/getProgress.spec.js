import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { Progress, Habit, User } from 'dat';
import getProgress from './getProgress.js';

describe('getProgress', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST));
    beforeEach(() => Promise.all([Progress.deleteMany(), Habit.deleteMany(), User.deleteMany()]));

    it('succeeds on retrieving progress for a habit', () => {
        const user = new User({ name: 'Abel', email: 'abel@example.com', username: 'abelmarquez', password: 'password123' });
        const habit = new Habit({ name: 'Exercise', user: user._id, emoji: '🏋️', category: 'actividad física', subcategory: 'gimnasio' });
        const progressData = { habit: habit._id, status: 'done', date: new Date() };

        return Promise.all([user.save(), habit.save()])
            .then(([user, habit]) => 
                Progress.create(progressData)
                    .then(() => getProgress(habit.id))
                    .then(progress => {
                        expect(progress).to.have.lengthOf(1);
                        expect(progress[0].status).to.equal('done');
                        expect(progress[0].habit.toString()).to.equal(habit.id);
                    })
            );
    });

    it('fails if habit does not exist', () =>
        expect(getProgress('012345678901234567890123')).to.be.rejectedWith(Error, 'Habit not found')
    );

    after(() => db.disconnect());
});
