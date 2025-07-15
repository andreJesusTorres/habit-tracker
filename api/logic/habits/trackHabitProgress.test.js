import 'dotenv/config';
import db, { User, Habit } from 'dat';
import trackHabitProgress from './trackHabitProgress.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(async () => {
        try {
            // Limpiar datos de prueba existentes
            await User.deleteMany({ email: 'test@example.com' });
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
            
            // Registrar progreso del hábito
            const progress = await trackHabitProgress(user._id.toString(), habit._id.toString(), 'done');
            console.log('✅ Progreso del hábito registrado exitosamente:', progress.status);
            
        } catch (error) {
            console.error('❌ Error al registrar progreso del hábito:', error.message);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect()); 