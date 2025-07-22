import 'dotenv/config';
import db, { User, Habit, Progress } from 'dat';
import trackHabitProgress from './trackHabitProgress.js';
import registerUser from '../users/registerUser.js';

// Tests para trackHabitProgress
async function testTrackHabitProgress() {
    let testUser;
    let testHabit;
    const email = 'testuser_progress@example.com';
    const username = 'testuserprogress';

    try {
        await db.connect(process.env.MONGO_URL_TEST);
        
        // Limpiar datos de prueba
        await User.deleteOne({ email });
        await Habit.deleteMany({ name: 'Ejercicio diario' });
        await Progress.deleteMany({ date: new Date().toISOString().split('T')[0] });
        
        // Crear usuario de prueba
        testUser = await registerUser('Test User Progress', email, username, 'password123', 'password123');
        
        // Crear hábito de prueba
        testHabit = await Habit.create({
            user: testUser._id,
            name: 'Ejercicio diario',
            category: 'actividad física',
            emoji: '🏋️'
        });
        
        // Test 1: Registrar progreso exitosamente
        console.log('Test 1: Registrar progreso exitosamente');
        const progress = await trackHabitProgress(testUser._id.toString(), testHabit._id.toString(), 'done');
        
        if (progress && progress.status === 'done') {
            console.log('✓ Progreso registrado correctamente');
        } else {
            console.log('✗ Progreso no se registró correctamente');
        }
        
        // Test 2: Intentar registrar progreso con user ID inválido
        console.log('Test 2: Intentar registrar progreso con user ID inválido');
        try {
            await trackHabitProgress('invalid-user-id', testHabit._id.toString(), 'done');
            console.log('✗ Debería haber fallado con user ID inválido');
        } catch (error) {
            console.log('✓ Correctamente rechazó user ID inválido');
        }
        
        // Test 3: Intentar registrar progreso con habit ID inválido
        console.log('Test 3: Intentar registrar progreso con habit ID inválido');
        try {
            await trackHabitProgress(testUser._id.toString(), 'invalid-habit-id', 'done');
            console.log('✗ Debería haber fallado con habit ID inválido');
        } catch (error) {
            console.log('✓ Correctamente rechazó habit ID inválido');
        }
        
        // Test 4: Verificar que no se puede registrar progreso duplicado para el mismo día
        console.log('Test 4: Verificar que no se puede registrar progreso duplicado para el mismo día');
        try {
            await trackHabitProgress(testUser._id.toString(), testHabit._id.toString(), 'done');
            console.log('✗ Debería haber fallado con progreso duplicado');
        } catch (error) {
            console.log('✓ Correctamente rechazó progreso duplicado');
        }
        
        console.log('\nTests completados');
        
    } catch (error) {
        console.error('Error en tests:', error.message);
    } finally {
        await User.deleteOne({ email });
        await Habit.deleteMany({ name: 'Ejercicio diario' });
        await Progress.deleteMany({ date: new Date().toISOString().split('T')[0] });
        await db.disconnect();
    }
}

// Ejecutar los tests
testTrackHabitProgress(); 