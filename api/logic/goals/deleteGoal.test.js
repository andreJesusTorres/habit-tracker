import 'dotenv/config';
import db, { User, Goal, Habit } from 'dat';
import deleteGoal from './deleteGoal.js';

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
            // Eliminar la meta
            await deleteGoal(user._id.toString(), goal._id.toString());
            console.log('✅ Meta eliminada exitosamente');
        } catch (error) {
            console.error('❌ Error al eliminar meta:', error.message);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect());
