import 'dotenv/config';
import db, { User, Habit } from 'dat';
import addHabit from './addHabit.js';

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
            
            const habit = await addHabit(user._id.toString(), 'Ejercicio diario', 'actividad física', 'gimnasio', '🏋️');
            console.log('✅ Hábito creado exitosamente:', habit.name);
        } catch (error) {
            console.error('❌ Error al crear hábito:', error.message);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect()); 