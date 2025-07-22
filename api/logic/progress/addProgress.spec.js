import 'dotenv/config';
import db, { User, Habit, Progress } from 'dat';
import addProgress from './addProgress.js';
import registerUser from '../users/registerUser.js';

// Tests para addProgress
async function testAddProgress() {
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
        
        // Test 1: Crear progreso exitosamente
        console.log('Test 1: Crear progreso exitosamente');
        const progressData = {
            date: new Date().toISOString().split('T')[0],
            status: 'done',
            habit: testHabit._id.toString()
        };
        
        const progress = await addProgress(testUser._id.toString(), progressData);
        
        if (progress && progress.status === 'done' && progress.habit.toString() === testHabit._id.toString()) {
            console.log('✓ Progreso creado correctamente');
        } else {
            console.log('✗ Progreso no se creó correctamente');
        }
        
        // Test 2: Intentar crear progreso con user ID inválido
        console.log('Test 2: Intentar crear progreso con user ID inválido');
        try {
            await addProgress('invalid-user-id', progressData);
            console.log('✗ Debería haber fallado con user ID inválido');
        } catch (error) {
            console.log('✓ Correctamente rechazó user ID inválido');
        }
        
        // Test 3: Intentar crear progreso con status inválido
        console.log('Test 3: Intentar crear progreso con status inválido');
        const invalidProgressData = {
            date: new Date().toISOString().split('T')[0],
            status: 'invalid-status',
            habit: testHabit._id.toString()
        };
        
        try {
            await addProgress(testUser._id.toString(), invalidProgressData);
            console.log('✗ Debería haber fallado con status inválido');
        } catch (error) {
            console.log('✓ Correctamente rechazó status inválido');
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
testAddProgress(); 