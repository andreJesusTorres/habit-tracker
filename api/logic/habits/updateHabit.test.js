import 'dotenv/config';
import db, { User, Habit } from 'dat';
import updateHabit from './updateHabit.js';

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
            
            // Actualizar el hábito
            const updatedHabit = await updateHabit(
                habit._id.toString(),
                user._id.toString(),
                {
                    name: 'Ejercicio matutino',
                    emoji: '🌅'
                }
            );
            console.log('✅ Hábito actualizado exitosamente:', updatedHabit.name);
            
        } catch (error) {
            console.error('❌ Error al actualizar hábito:', error.message);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect());