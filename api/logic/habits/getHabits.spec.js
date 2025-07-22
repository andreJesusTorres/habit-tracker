import 'dotenv/config';
import db, { User, Habit } from 'dat';
import getHabits from './getHabits.js';
import registerUser from '../users/registerUser.js';

// Tests para getHabits
async function testGetHabits() {
    let testUser;
    const email = 'testuser_habits@example.com';
    const username = 'testuserhabits';

    try {
        await db.connect(process.env.MONGO_URL_TEST);
        
        // Limpiar datos de prueba
        await User.deleteOne({ email });
        await Habit.deleteMany({ name: { $in: ['Ejercicio diario', 'Leer libros'] } });
        
        // Crear usuario de prueba
        testUser = await registerUser('Test User Habits', email, username, 'password123', 'password123');
        
        // Test 1: Obtener hábitos cuando no hay ninguno
        console.log('Test 1: Obtener hábitos cuando no hay ninguno');
        const emptyHabits = await getHabits(testUser._id.toString());
        
        if (Array.isArray(emptyHabits) && emptyHabits.length === 0) {
            console.log('✓ Lista vacía correctamente');
        } else {
            console.log('✗ No devolvió lista vacía');
        }
        
        // Crear algunos hábitos de prueba
        await Habit.create([
            {
                user: testUser._id,
                name: 'Ejercicio diario',
                category: 'actividad física',
                emoji: '🏋️'
            },
            {
                user: testUser._id,
                name: 'Leer libros',
                category: 'desarrollo personal',
                emoji: '📚'
            }
        ]);
        
        // Test 2: Obtener hábitos del usuario
        console.log('Test 2: Obtener hábitos del usuario');
        const habits = await getHabits(testUser._id.toString());
        
        if (Array.isArray(habits) && habits.length === 2) {
            console.log('✓ Hábitos obtenidos correctamente');
        } else {
            console.log('✗ No se obtuvieron los hábitos correctamente');
        }
        
        // Test 3: Verificar que solo devuelve hábitos del usuario correcto
        console.log('Test 3: Verificar que solo devuelve hábitos del usuario correcto');
        const otherUser = await registerUser('Other User', 'other@test.com', 'otheruser', 'password123', 'password123');
        
        await Habit.create({
            user: otherUser._id,
            name: 'Hábito de otro usuario',
            category: 'actividad física',
            emoji: '🏃'
        });
        
        const userHabits = await getHabits(testUser._id.toString());
        
        if (userHabits.length === 2 && userHabits.every(h => h.user.toString() === testUser._id.toString())) {
            console.log('✓ Solo devuelve hábitos del usuario correcto');
        } else {
            console.log('✗ Devuelve hábitos de otros usuarios');
        }
        
        console.log('\nTests completados');
        
    } catch (error) {
        console.error('Error en tests:', error.message);
    } finally {
        await User.deleteOne({ email });
        await User.deleteOne({ email: 'other@test.com' });
        await Habit.deleteMany({ name: { $in: ['Ejercicio diario', 'Leer libros', 'Hábito de otro usuario'] } });
        await db.disconnect();
    }
}

// Ejecutar los tests
testGetHabits();
