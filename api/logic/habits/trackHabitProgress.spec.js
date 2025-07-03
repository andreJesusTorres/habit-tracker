import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

const { expect } = chai;

import db, { Habit, Progress } from 'dat';
import trackHabitProgress from './trackHabitProgress.js';

describe('trackHabitProgress', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST));

    beforeEach(() => Promise.all([Habit.deleteMany(), Progress.deleteMany()]));

    it('succeeds on valid habit progress tracking', () => {
        const habit = new Habit({ name: 'Leer un libro', emoji: '📚', category: 'desarrollo personal' });

        return habit.save()
            .then(habit =>
                trackHabitProgress(habit._id, '2025-01-25', 'done')
                    .then(progress => {
                        expect(progress).to.exist;
                        expect(progress.habit.toString()).to.equal(habit._id.toString());
                        expect(progress.status).to.equal('done');
                    })
            );
    });

    it('fails on non-existing habit', () =>
        expect(trackHabitProgress('012345678901234567890123', '2025-01-25', 'done'))
            .to.be.rejectedWith(Error, 'Habit not found')
    );

    after(() => db.disconnect());
});
