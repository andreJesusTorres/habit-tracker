import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { Event, User } from 'dat';
import addEvent from './addEvent.js';

describe('addEvent', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST));
    beforeEach(() => Promise.all([Event.deleteMany(), User.deleteMany()]));

    it('succeeds on adding a new event', () => {
        const user = new User({ name: 'Abel', email: 'abel@example.com', username: 'abelmarquez', password: 'password123' });

        return user.save()
            .then(user => 
                addEvent(user.id, 'Meeting', 'Discuss project', new Date(), new Date(), 'once')
                    .then(eventId => {
                        expect(eventId).to.exist;
                        return Event.findById(eventId);
                    })
                    .then(event => {
                        expect(event).to.exist;
                        expect(event.name).to.equal('Meeting');
                        expect(event.user.toString()).to.equal(user.id);
                    })
            );
    });

    it('fails if user does not exist', () =>
        expect(addEvent('012345678901234567890123', 'Meeting', 'Discuss project', new Date(), new Date(), 'once'))
            .to.be.rejectedWith(Error, 'User not found')
    );

    after(() => db.disconnect());
});
