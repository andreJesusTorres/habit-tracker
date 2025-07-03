import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { Progress, User, Habit } from 'dat';
import addProgress from './addProgress.js';

describe('addProgress', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST));
    beforeEach(() => Promise.all([Progress.deleteMany(), User.deleteMany(), Habit.deleteMany()]));

    it('succeeds on adding progress for a habit', () => {
        const user = new User({ name: 'Abel', email: 'abel@example.com', username: 'abelmarquez', password: 'password123' });
        const habit = new Habit({ name: 'Exercise', user: user._id, emoji: '🏋️', category: 'actividad física', subcategory: 'gimnasio' });

        return Promise.all([user.save(), habit.save()])
            .then(([user, habit]) => 
                addProgress(habit.id, 'done', new Date())
                    .then(progressId => {
                        expect(progressId).to.exist;
                        return Progress.findById(progressId);
                    })
                    .then(progress => {
                        expect(progress).to.exist;
                        expect(progress.status).to.equal('done');
                        expect(progress.habit.toString()).to.equal(habit.id);
                    })
            );
    });

    it('fails if habit does not exist', () =>
        expect(addProgress('012345678901234567890123', 'done', new Date())).to.be.rejectedWith(Error, 'Habit not found')
    );

    after(() => db.disconnect());
});
