import 'dotenv/config';
import db from 'dat';
import updateEvent from './updateEvent.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(() =>
        updateEvent(
            '67d055bc1cbc060f7d968a6d', // Sustituye con un ID válido
            'Updated Meeting',
            'ME DA IGUAAALLLL ',
            new Date('2025-02-01T00:00:00.000Z'),
            new Date('2025-02-02T00:00:00.000Z'),
            'daily'
        )
            .then(console.log)
            .catch(console.error)
    )
    .catch(console.error)
    .finally(() => db.disconnect());
