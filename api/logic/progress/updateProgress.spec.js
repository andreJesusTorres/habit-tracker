import 'dotenv/config';
import db, { User, Habit, Progress } from 'dat';
import updateProgress from './updateProgress.js';
import registerUser from '../users/registerUser.js';

// Tests para updateProgress
async function testUpdateProgress() {
    let testUser;
    let testHabit;
    let testProgress;
    const email = 'testuser_updateprogress@example.com';
    const username = 'testuserupdateprogress';

    try {
        await db.connect(process.env.MONGO_URL_TEST);
        
        // Limpiar datos de prueba
        await User.deleteOne({ email });
        await Habit.deleteMany({ name: 'Ejercicio diario' });
        await Progress.deleteMany({ date: new Date().toISOString().split('T')[0] });
        
        // Crear usuario de prueba
        testUser = await registerUser('Test User UpdateProgress', email, username, 'password123', 'password123');
        
        // Crear hábito de prueba
        testHabit = await Habit.create({
            user: testUser._id,
            name: 'Ejercicio diario',
            category: 'actividad física',
            emoji: '🏋️'
        });
        
        // Crear progreso de prueba
        testProgress = await Progress.create({
            date: new Date().toISOString().split('T')[0],
            status: 'done',
            habit: testHabit._id
        });
        
        // Test 1: Actualizar progreso exitosamente
        console.log('Test 1: Actualizar progreso exitosamente');
        const updateData = {
            status: 'missed'
        };
        
        const updatedProgress = await updateProgress(testUser._id.toString(), testProgress._id.toString(), updateData);
        
        if (updatedProgress && updatedProgress.status === 'missed') {
            console.log('✓ Progreso actualizado correctamente');
        } else {
            console.log('✗ Progreso no se actualizó correctamente');
        }
        
        // Test 2: Intentar actualizar con progress ID inválido
        console.log('Test 2: Intentar actualizar con progress ID inválido');
        try {
            await updateProgress(testUser._id.toString(), 'invalid-progress-id', updateData);
            console.log('✗ Debería haber fallado con progress ID inválido');
        } catch (error) {
            console.log('✓ Correctamente rechazó progress ID inválido');
        }
        
        // Test 3: Intentar actualizar con status inválido
        console.log('Test 3: Intentar actualizar con status inválido');
        const invalidUpdateData = {
            status: 'invalid-status'
        };
        
        try {
            await updateProgress(testUser._id.toString(), testProgress._id.toString(), invalidUpdateData);
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
testUpdateProgress(); 