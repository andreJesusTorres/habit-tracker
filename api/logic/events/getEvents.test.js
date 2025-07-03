import 'dotenv/config';
import db from 'dat';
import getEvents from './getEvents.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(() => 
        getEvents('675ace02a28a390d912bc40e') // userId válido
        .then(console.log)
        .catch(console.error)
    )
    .catch(console.error)
    .finally(() => db.disconnect());
