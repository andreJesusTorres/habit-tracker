import 'dotenv/config';
import db, { User, Habit } from 'dat';
import deleteHabit from './deleteHabit.js';
import registerUser from '../users/registerUser.js';

// Tests para deleteHabit
async function testDeleteHabit() {
    let testUser;
    let testHabit;
    const email = 'testuser_deletehabit@example.com';
    const username = 'testuserdeletehabit';

    try {
        await db.connect(process.env.MONGO_URL_TEST);
        
        // Limpiar datos de prueba
        await User.deleteOne({ email });
        await Habit.deleteMany({ name: 'Ejercicio diario' });
        
        // Crear usuario de prueba
        testUser = await registerUser('Test User DeleteHabit', email, username, 'password123', 'password123');
        
        // Crear hábito de prueba
        testHabit = await Habit.create({
            user: testUser._id,
            name: 'Ejercicio diario',
            category: 'actividad física',
            emoji: '🏋️'
        });
        
        // Test 1: Eliminar hábito exitosamente
        console.log('Test 1: Eliminar hábito exitosamente');
        const result = await deleteHabit(testUser._id.toString(), testHabit._id.toString());
        
        if (result && result.success) {
            console.log('✓ Hábito eliminado correctamente');
        } else {
            console.log('✗ Hábito no se eliminó correctamente');
        }
        
        // Verificar que el hábito ya no existe
        const deletedHabit = await Habit.findById(testHabit._id);
        if (!deletedHabit) {
            console.log('✓ Hábito efectivamente eliminado de la base de datos');
        } else {
            console.log('✗ Hábito aún existe en la base de datos');
        }
        
        // Test 2: Intentar eliminar con habit ID inválido
        console.log('Test 2: Intentar eliminar con habit ID inválido');
        try {
            await deleteHabit(testUser._id.toString(), 'invalid-habit-id');
            console.log('✗ Debería haber fallado con habit ID inválido');
        } catch (error) {
            console.log('✓ Correctamente rechazó habit ID inválido');
        }
        
        // Test 3: Intentar eliminar hábito inexistente
        console.log('Test 3: Intentar eliminar hábito inexistente');
        try {
            await deleteHabit(testUser._id.toString(), testUser._id.toString()); // Usar ID de usuario como hábito inexistente
            console.log('✗ Debería haber fallado con hábito inexistente');
        } catch (error) {
            console.log('✓ Correctamente rechazó hábito inexistente');
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
testDeleteHabit();
