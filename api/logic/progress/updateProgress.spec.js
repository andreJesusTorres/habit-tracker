import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { Progress, Habit, User } from 'dat';
import updateProgress from './updateProgress.js';

describe('updateProgress', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST));
    beforeEach(() => Promise.all([Progress.deleteMany(), Habit.deleteMany(), User.deleteMany()]));

    it('succeeds on updating progress for a habit', () => {
        const user = new User({ name: 'Abel', email: 'abel@example.com', username: 'abelmarquez', password: 'password123' });
        const habit = new Habit({ name: 'Exercise', user: user._id, emoji: '🏋️', category: 'actividad física', subcategory: 'gimnasio' });
        const progress = new Progress({ habit: habit._id, status: 'done', date: new Date() });

        return Promise.all([user.save(), habit.save(), progress.save()])
            .then(([user, habit, progress]) => 
                updateProgress(progress.id, { status: 'missed' })
                    .then(() => Progress.findById(progress.id))
                    .then(updatedProgress => {
                        expect(updatedProgress).to.exist;
                        expect(updatedProgress.status).to.equal('missed');
                    })
            );
    });

    it('fails if progress does not exist', () =>
        expect(updateProgress('012345678901234567890123', { status: 'done' }))
            .to.be.rejectedWith(Error, 'Progress not found')
    );

    after(() => db.disconnect());
});
