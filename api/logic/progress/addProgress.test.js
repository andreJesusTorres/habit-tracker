import 'dotenv/config';
import db, { User, Progress, Habit } from 'dat';
import addProgress from './addProgress.js';

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
            
            const progressId = await addProgress(user._id.toString(), habit._id.toString(), new Date(), 'done');
            console.log('✅ Progreso creado exitosamente:', progressId);
        } catch (error) {
            console.error('❌ Error al crear progreso:', error.message);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect()); 