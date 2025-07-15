import 'dotenv/config';
import db, { User, Habit } from 'dat';
import getHabits from './getHabits.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(async () => {
        try {
            // Limpiar datos de prueba existentes
            await User.deleteMany({ email: 'test@example.com' });
            await Habit.deleteMany({ name: { $in: ['Ejercicio diario', 'Leer libros'] } });
            
            // Crear usuario de prueba
            const user = await User.create({
                name: 'Usuario Test',
                email: 'test@example.com',
                username: 'testuser',
                password: 'password123',
                role: 'regular'
            });
            
            // Crear algunos hábitos de prueba
            await Habit.create([
                {
                    user: user._id,
                    name: 'Ejercicio diario',
                    category: 'actividad física',
                    emoji: '🏋️'
                },
                {
                    user: user._id,
                    name: 'Leer libros',
                    category: 'desarrollo personal',
                    emoji: '📚'
                }
            ]);
            
            // Obtener hábitos del usuario
            const habits = await getHabits(user._id.toString());
            console.log('✅ Hábitos obtenidos exitosamente:', habits.length, 'hábitos encontrados');
            
        } catch (error) {
            console.error('❌ Error al obtener hábitos:', error.message);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect());