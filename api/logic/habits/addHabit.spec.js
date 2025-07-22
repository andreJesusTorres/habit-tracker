import 'dotenv/config';
import db, { User, Habit } from 'dat';
import addHabit from './addHabit.js';
import registerUser from '../users/registerUser.js';

// Tests para addHabit
async function testAddHabit() {
    let testUser;
    const email = 'testuser_habit@example.com';
    const username = 'testuserhabit';

    try {
        await db.connect(process.env.MONGO_URL_TEST);
        
        // Limpiar datos de prueba
        await User.deleteOne({ email });
        await Habit.deleteMany({ name: 'Ejercicio diario' });
        
        // Crear usuario de prueba
        testUser = await registerUser('Test User Habit', email, username, 'password123', 'password123');
        
        // Test 1: Crear hábito exitosamente
        console.log('Test 1: Crear hábito exitosamente');
        const habit = await addHabit(
            testUser._id.toString(), 
            'Ejercicio diario', 
            'actividad física', 
            'gimnasio', 
            '🏋️'
        );
        
        if (habit && habit.name === 'Ejercicio diario' && habit.category === 'actividad física') {
            console.log('✓ Hábito creado correctamente');
        } else {
            console.log('✗ Hábito no se creó correctamente');
        }
        
        // Test 2: Intentar crear hábito con categoría inválida
        console.log('Test 2: Intentar crear hábito con categoría inválida');
        try {
            await addHabit(testUser._id.toString(), 'Ejercicio', 'categoria-invalida', 'gimnasio', '🏋️');
            console.log('✗ Debería haber fallado con categoría inválida');
        } catch (error) {
            console.log('✓ Correctamente rechazó categoría inválida');
        }
        
        // Test 3: Intentar crear hábito con user ID inválido
        console.log('Test 3: Intentar crear hábito con user ID inválido');
        try {
            await addHabit('invalid-user-id', 'Ejercicio diario', 'actividad física', 'gimnasio', '🏋️');
            console.log('✗ Debería haber fallado con user ID inválido');
        } catch (error) {
            console.log('✓ Correctamente rechazó user ID inválido');
        }
        
        console.log('\nTests completados');
        
    } catch (error) {
        console.error('Error en tests:', error.message);
    } finally {
        await User.deleteOne({ email });
        await Habit.deleteMany({ name: 'Ejercicio diario' });
        await db.disconnect();
    }
}

// Ejecutar los tests
testAddHabit();
