import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { Event, User } from 'dat';
import updateEvent from './updateEvent.js';

describe('updateEvent', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST));
    beforeEach(() => Promise.all([Event.deleteMany(), User.deleteMany()]));

    it('succeeds on updating an event', () => {
        const user = new User({ name: 'Abel', email: 'abel@example.com', username: 'abelmarquez', password: 'password123' });
        const event = new Event({ name: 'Meeting', user: user._id, description: 'Discuss project', startDate: new Date(), frequency: 'once' });

        return user.save()
            .then(user => event.save())
            .then(event => 
                updateEvent(event.id, { name: 'Updated Meeting' })
                    .then(() => Event.findById(event.id))
                    .then(updatedEvent => {
                        expect(updatedEvent).to.exist;
                        expect(updatedEvent.name).to.equal('Updated Meeting');
                    })
            );
    });

    it('fails if event does not exist', () =>
        expect(updateEvent('012345678901234567890123', { name: 'New Event' }))
            .to.be.rejectedWith(Error, 'Event not found')
    );

    after(() => db.disconnect());
});
