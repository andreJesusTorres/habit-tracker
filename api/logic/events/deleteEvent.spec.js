import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { Event, User } from 'dat';
import deleteEvent from './deleteEvent.js';

describe('deleteEvent', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST));
    beforeEach(() => Promise.all([Event.deleteMany(), User.deleteMany()]));

    it('succeeds on deleting an event', () => {
        const user = new User({ name: 'Abel', email: 'abel@example.com', username: 'abelmarquez', password: 'password123' });
        const event = new Event({ name: 'Meeting', user: user._id, description: 'Discuss project', startDate: new Date(), frequency: 'once' });

        return user.save()
            .then(user => event.save())
            .then(event => 
                deleteEvent(event.id)
                    .then(() => Event.findById(event.id))
                    .then(deletedEvent => {
                        expect(deletedEvent).to.not.exist;
                    })
            );
    });

    it('fails if event does not exist', () =>
        expect(deleteEvent('012345678901234567890123'))
            .to.be.rejectedWith(Error, 'Event not found')
    );

    after(() => db.disconnect());
});
