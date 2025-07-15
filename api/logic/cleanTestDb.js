import 'dotenv/config';
import db, { User, Habit, Goal, Progress, Event } from 'dat';

async function cleanDb() {
    await db.connect(process.env.MONGO_URL_TEST);
    await Promise.all([
        User.deleteMany(),
        Habit.deleteMany(),
        Goal.deleteMany(),
        Progress.deleteMany(),
        Event.deleteMany()
    ]);
    await db.disconnect();
    console.log('✅ Base de datos de test limpiada');
}

cleanDb(); 