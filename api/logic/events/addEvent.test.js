import 'dotenv/config';
import db from 'dat';
import addEvent from './addEvent.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(() => 
        addEvent(
            '675ace02a28a390d912bc40e', // userId válido
            'Meeting with team', 
            new Date('2025-01-30T00:00:00.000Z'), 
            'Weekly team meeting',
            null,
            'weekly',
            
        )
        .then(console.log)
        .catch(console.error)
    )
    .catch(console.error)
    .finally(() => db.disconnect());
