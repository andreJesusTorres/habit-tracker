import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { Event, User } from 'dat';
import getEvents from './getEvents.js';

describe('getEvents', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST));
    beforeEach(() => Promise.all([Event.deleteMany(), User.deleteMany()]));

    it('succeeds on retrieving events for a user', () => {
        const user = new User({ name: 'Abel', email: 'abel@example.com', username: 'abelmarquez', password: 'password123' });
        const events = [
            { name: 'Meeting', user: user._id, description: 'Discuss project', startDate: new Date(), frequency: 'once' },
            { name: 'Gym', user: user._id, description: 'Workout session', startDate: new Date(), frequency: 'daily' }
        ];

        return user.save()
            .then(user => Event.insertMany(events))
            .then(() => getEvents(user.id))
            .then(fetchedEvents => {
                expect(fetchedEvents).to.have.lengthOf(2);
                expect(fetchedEvents[0].name).to.equal('Meeting');
                expect(fetchedEvents[1].name).to.equal('Gym');
            });
    });

    it('fails if user does not exist', () =>
        expect(getEvents('012345678901234567890123')).to.be.rejectedWith(Error, 'User not found')
    );

    after(() => db.disconnect());
});
