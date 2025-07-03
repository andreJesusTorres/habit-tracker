import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { Progress, Habit, User } from 'dat';
import deleteProgress from './deleteProgress.js';

describe('deleteProgress', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST));
    beforeEach(() => Promise.all([Progress.deleteMany(), Habit.deleteMany(), User.deleteMany()]));

    it('succeeds on deleting progress for a habit', () => {
        const user = new User({ name: 'Abel', email: 'abel@example.com', username: 'abelmarquez', password: 'password123' });
        const habit = new Habit({ name: 'Exercise', user: user._id, emoji: '🏋️', category: 'actividad física', subcategory: 'gimnasio' });
        const progress = new Progress({ habit: habit._id, status: 'done', date: new Date() });

        return Promise.all([user.save(), habit.save(), progress.save()])
            .then(([user, habit, progress]) => 
                deleteProgress(progress.id)
                    .then(() => Progress.findById(progress.id))
                    .then(deletedProgress => {
                        expect(deletedProgress).to.not.exist;
                    })
            );
    });

    it('fails if progress does not exist', () =>
        expect(deleteProgress('012345678901234567890123'))
            .to.be.rejectedWith(Error, 'Progress not found')
    );

    after(() => db.disconnect());
});
