import 'dotenv/config';
import db, { User } from 'dat';
import addHabit from './addHabit.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(async () => {
        try {
            // Primero necesitamos crear un usuario para poder crear un hábito
            const user = await User.findOne({ email: 'test@example.com' });
            if (!user) {
                console.log('❌ No se encontró usuario de prueba. Ejecuta primero registerUser.test.js');
                return;
            }
            
            const habit = await addHabit(user._id.toString(), 'Ejercicio diario', 'actividad física', 'gimnasio', '🏋️');
            console.log('✅ Hábito creado exitosamente:', habit.name);
        } catch (error) {
            console.error('❌ Error al crear hábito:', error.message);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect()); 