import 'dotenv/config';
import db, { User, Habit } from 'dat';
import updateHabit from './updateHabit.js';
import registerUser from '../users/registerUser.js';

// Tests para updateHabit
async function testUpdateHabit() {
    let testUser;
    let testHabit;
    const email = 'testuser_updatehabit@example.com';
    const username = 'testuserupdatehabit';

    try {
        await db.connect(process.env.MONGO_URL_TEST);
        
        // Limpiar datos de prueba
        await User.deleteOne({ email });
        await Habit.deleteMany({ name: { $in: ['Ejercicio diario', 'Ejercicio actualizado'] } });
        
        // Crear usuario de prueba
        testUser = await registerUser('Test User UpdateHabit', email, username, 'password123', 'password123');
        
        // Crear hábito de prueba
        testHabit = await Habit.create({
            user: testUser._id,
            name: 'Ejercicio diario',
            category: 'actividad física',
            emoji: '🏋️'
        });
        
        // Test 1: Actualizar hábito exitosamente
        console.log('Test 1: Actualizar hábito exitosamente');
        const updateData = {
            name: 'Ejercicio actualizado',
            emoji: '💪'
        };
        
        const updatedHabit = await updateHabit(testHabit._id.toString(), testUser._id.toString(), updateData);
        
        if (updatedHabit && updatedHabit.name === 'Ejercicio actualizado' && updatedHabit.emoji === '💪') {
            console.log('✓ Hábito actualizado correctamente');
        } else {
            console.log('✗ Hábito no se actualizó correctamente');
        }
        
        // Test 2: Intentar actualizar con categoría inválida
        console.log('Test 2: Intentar actualizar con categoría inválida');
        const invalidUpdateData = {
            name: 'Ejercicio actualizado',
            emoji: '💪'
        };
        
        try {
            await updateHabit(testHabit._id.toString(), testUser._id.toString(), invalidUpdateData);
            console.log('✗ Debería haber fallado con categoría inválida');
        } catch (error) {
            console.log('✓ Correctamente rechazó categoría inválida');
        }
        
        // Test 3: Intentar actualizar con habit ID inválido
        console.log('Test 3: Intentar actualizar con habit ID inválido');
        try {
            await updateHabit('invalid-habit-id', testUser._id.toString(), updateData);
            console.log('✗ Debería haber fallado con habit ID inválido');
        } catch (error) {
            console.log('✓ Correctamente rechazó habit ID inválido');
        }
        
        console.log('\nTests completados');
        
    } catch (error) {
        console.error('Error en tests:', error.message);
    } finally {
        await User.deleteOne({ email });
        await Habit.deleteMany({ name: { $in: ['Ejercicio diario', 'Ejercicio actualizado'] } });
        await db.disconnect();
    }
}

// Ejecutar los tests
testUpdateHabit();
