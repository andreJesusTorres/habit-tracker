import 'dotenv/config';
import db, { User, Goal, Habit } from 'dat';
import updateGoal from './updateGoal.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(async () => {
        try {
            // Limpiar datos de prueba existentes
            await User.deleteMany({ email: 'test@example.com' });
            await Goal.deleteMany({ name: 'Meta de ejercicio' });
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
            // Crear meta de prueba
            const goal = await Goal.create({
                user: user._id,
                habit: habit._id,
                name: 'Meta de ejercicio',
                period: 'monthly',
                objective: 30,
                targetDays: 30,
                startDate: new Date(),
                endDate: new Date('2024-12-31')
            });
            // Actualizar la meta
            const updatedGoal = await updateGoal(
                user._id.toString(),
                goal._id.toString(),
                {
                    name: 'Meta de ejercicio avanzada',
                    period: 'monthly',
                    objective: 60,
                    targetDays: 30,
                    endDate: new Date('2025-01-31')
                }
            );
            console.log('✅ Meta actualizada exitosamente:', updatedGoal.name);
        } catch (error) {
            console.error('❌ Error al actualizar meta:', error.message);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect());
