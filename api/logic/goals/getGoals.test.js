import 'dotenv/config';
import db, { User, Goal, Habit } from 'dat';
import getGoals from './getGoals.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(async () => {
        try {
            // Limpiar datos de prueba existentes
            await User.deleteMany({ email: 'test@example.com' });
            await Goal.deleteMany({ name: { $in: ['Aprender React', 'Ejercicio mensual'] } });
            await Habit.deleteMany({ name: 'Ejercicio diario' });
            
            // Crear usuario de prueba
            const user = await User.create({
                name: 'Usuario Test',
                email: 'test@example.com',
                username: 'testuser',
                password: 'password123',
                role: 'regular'
            });
            
            // Crear hábito de prueba
            const habit = await Habit.create({
                user: user._id,
                name: 'Ejercicio diario',
                category: 'actividad física',
                emoji: '🏋️'
            });
            
            // Crear algunas metas de prueba
            await Goal.create([
                {
                    user: user._id,
                    habit: habit._id,
                    name: 'Aprender React',
                    period: 'monthly',
                    objective: 30,
                    targetDays: 30,
                    startDate: new Date(),
                    endDate: new Date('2024-12-31')
                },
                {
                    user: user._id,
                    habit: habit._id,
                    name: 'Ejercicio mensual',
                    period: 'monthly',
                    objective: 20,
                    targetDays: 30,
                    startDate: new Date(),
                    endDate: new Date('2024-11-30')
                }
            ]);
            
            // Obtener metas del usuario
            const goals = await getGoals(user._id.toString());
            console.log('✅ Metas obtenidas exitosamente:', goals.length, 'metas encontradas');
            
        } catch (error) {
            console.error('❌ Error al obtener metas:', error.message);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect());
