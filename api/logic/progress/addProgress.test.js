import 'dotenv/config';
import db from 'dat';
import addProgress from './addProgress.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        return addProgress(
            '675ace02a28a390d912bc40e', // userId
            '675b0ff9158704bcf2d74f47', // habitId
            new Date(), // date
            'missed' // status
        )
            .then(console.log) // Log the created progress ID
            .catch(console.error);
    })
    .catch(console.error)
    .finally(() => db.disconnect());