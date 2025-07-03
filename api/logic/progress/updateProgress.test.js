import 'dotenv/config';
import db from 'dat';
import updateProgress from './updateProgress.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        return updateProgress(
            '679badac0e96a21dc7370369', // progressId
            '675ace02a28a390d912bc40e', // userId
            { date: new Date(), status: 'done' } // updates
        )
            .then(console.log) // Log the updated progress ID
            .catch(console.error);
    })
    .catch(console.error)
    .finally(() => db.disconnect());