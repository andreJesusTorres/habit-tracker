import 'dotenv/config';
import db, { User, Habit } from 'dat';
import addGoal from './addGoal.js';

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
            
            const goalData = {
                name: 'Meta mensual de ejercicio',
                period: 'monthly',
                objective: 30,
                targetDays: 30
            };
            
            const goal = await addGoal(user._id.toString(), habit._id.toString(), goalData);
            console.log('✅ Meta creada exitosamente:', goal.name);
        } catch (error) {
            console.error('❌ Error al crear meta:', error.message);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect()); 