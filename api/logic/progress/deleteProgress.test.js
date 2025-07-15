import 'dotenv/config';
import db, { User, Progress, Habit } from 'dat';
import deleteProgress from './deleteProgress.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(async () => {
        try {
            // Limpiar datos de prueba existentes
            await User.deleteMany({ email: 'test@example.com' });
            await Progress.deleteMany({});
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
            // Crear registro de progreso de prueba
            const progress = await Progress.create({
                habit: habit._id,
                date: new Date('2024-11-15'),
                status: 'done'
            });
            // Eliminar el progreso
            await deleteProgress(progress._id.toString(), habit._id.toString());
            console.log('✅ Progreso eliminado exitosamente');
        } catch (error) {
            console.error('❌ Error al eliminar progreso:', error.message);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect());
