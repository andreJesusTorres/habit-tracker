import 'dotenv/config';
import db, { User, Habit, Progress } from 'dat';
import deleteProgress from './deleteProgress.js';
import registerUser from '../users/registerUser.js';

// Tests para deleteProgress
async function testDeleteProgress() {
    let testUser;
    let testHabit;
    let testProgress;
    const email = 'testuser_deleteprogress@example.com';
    const username = 'testuserdeleteprogress';

    try {
        await db.connect(process.env.MONGO_URL_TEST);
        
        // Limpiar datos de prueba
        await User.deleteOne({ email });
        await Habit.deleteMany({ name: 'Ejercicio diario' });
        await Progress.deleteMany({ date: new Date().toISOString().split('T')[0] });
        
        // Crear usuario de prueba
        testUser = await registerUser('Test User DeleteProgress', email, username, 'password123', 'password123');
        
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
        
        // Test 1: Eliminar progreso exitosamente
        console.log('Test 1: Eliminar progreso exitosamente');
        const result = await deleteProgress(testUser._id.toString(), testProgress._id.toString());
        
        if (result && result.success) {
            console.log('✓ Progreso eliminado correctamente');
        } else {
            console.log('✗ Progreso no se eliminó correctamente');
        }
        
        // Verificar que el progreso ya no existe
        const deletedProgress = await Progress.findById(testProgress._id);
        if (!deletedProgress) {
            console.log('✓ Progreso efectivamente eliminado de la base de datos');
        } else {
            console.log('✗ Progreso aún existe en la base de datos');
        }
        
        // Test 2: Intentar eliminar con progress ID inválido
        console.log('Test 2: Intentar eliminar con progress ID inválido');
        try {
            await deleteProgress(testUser._id.toString(), 'invalid-progress-id');
            console.log('✗ Debería haber fallado con progress ID inválido');
        } catch (error) {
            console.log('✓ Correctamente rechazó progress ID inválido');
        }
        
        // Test 3: Intentar eliminar progreso inexistente
        console.log('Test 3: Intentar eliminar progreso inexistente');
        try {
            await deleteProgress(testUser._id.toString(), testUser._id.toString()); // Usar ID de usuario como progreso inexistente
            console.log('✗ Debería haber fallado con progreso inexistente');
        } catch (error) {
            console.log('✓ Correctamente rechazó progreso inexistente');
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
testDeleteProgress(); 