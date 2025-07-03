import 'dotenv/config';
import db from 'dat';
import deleteProgress from './deleteProgress.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return deleteProgress('67cae279577a462d0a28267a', '675b0ff9158704bcf2d74f47') // progressId y habitId
                .then(() => console.log('Progreso eliminado correctamente'))
                .catch(console.error);
        } catch (error) {
            console.error(error);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect());
