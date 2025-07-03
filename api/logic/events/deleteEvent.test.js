import 'dotenv/config';
import db from 'dat';
import deleteEvent from './deleteEvent.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(() => 
        deleteEvent( '67d0553df3b7032dc8a4a1aa') 
        .then(console.log)
        .catch(console.error)
    )
    .catch(console.error)
    .finally(() => db.disconnect());