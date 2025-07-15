import 'dotenv/config';
import db, { User, Habit } from 'dat';
import addProgress from './addProgress.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(async () => {
        try {
            const [user, habit] = await Promise.all([
                User.findOne({ email: 'test@example.com' }),
                Habit.findOne({ name: 'Ejercicio diario' })
            ]);
            
            if (!user || !habit) {
                console.log('❌ No se encontró usuario o hábito de prueba. Ejecuta primero registerUser.test.js y addHabit.test.js');
                return;
            }
            
            const progressId = await addProgress(user._id.toString(), habit._id.toString(), new Date(), 'done');
            console.log('✅ Progreso registrado exitosamente. ID:', progressId);
        } catch (error) {
            console.error('❌ Error al registrar progreso:', error.message);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect()); 