import 'dotenv/config';
import db, { User, Habit, Progress } from 'dat';
import getProgress from './getProgress.js';
import registerUser from '../users/registerUser.js';

// Tests para getProgress
async function testGetProgress() {
    let testUser;
    let testHabit;
    const email = 'testuser_getprogress@example.com';
    const username = 'testusergetprogress';

    try {
        await db.connect(process.env.MONGO_URL_TEST);
        
        // Limpiar datos de prueba
        await User.deleteOne({ email });
        await Habit.deleteMany({ name: 'Ejercicio diario' });
        await Progress.deleteMany({ date: new Date().toISOString().split('T')[0] });
        
        // Crear usuario de prueba
        testUser = await registerUser('Test User GetProgress', email, username, 'password123', 'password123');
        
        // Crear hábito de prueba
        testHabit = await Habit.create({
            user: testUser._id,
            name: 'Ejercicio diario',
            category: 'actividad física',
            emoji: '🏋️'
        });
        
        // Test 1: Obtener progreso cuando no hay ninguno
        console.log('Test 1: Obtener progreso cuando no hay ninguno');
        const emptyProgress = await getProgress(testUser._id.toString());
        
        if (Array.isArray(emptyProgress) && emptyProgress.length === 0) {
            console.log('✓ Lista vacía correctamente');
        } else {
            console.log('✗ No devolvió lista vacía');
        }
        
        // Crear algunos registros de progreso de prueba
        const today = new Date().toISOString().split('T')[0];
        await Progress.create([
            {
                date: today,
                status: 'done',
                habit: testHabit._id
            },
            {
                date: today,
                status: 'missed',
                habit: testHabit._id
            }
        ]);
        
        // Test 2: Obtener progreso del usuario
        console.log('Test 2: Obtener progreso del usuario');
        const progress = await getProgress(testUser._id.toString());
        
        if (Array.isArray(progress) && progress.length === 2) {
            console.log('✓ Progreso obtenido correctamente');
        } else {
            console.log('✗ No se obtuvo el progreso correctamente');
        }
        
        // Test 3: Verificar que solo devuelve progreso del usuario correcto
        console.log('Test 3: Verificar que solo devuelve progreso del usuario correcto');
        const otherUser = await registerUser('Other User', 'other@test.com', 'otheruser', 'password123', 'password123');
        
        const otherHabit = await Habit.create({
            user: otherUser._id,
            name: 'Hábito de otro usuario',
            category: 'actividad física',
            emoji: '🏃'
        });
        
        await Progress.create({
            date: today,
            status: 'done',
            habit: otherHabit._id
        });
        
        const userProgress = await getProgress(testUser._id.toString());
        
        if (userProgress.length === 2 && userProgress.every(p => p.habit.toString() === testHabit._id.toString())) {
            console.log('✓ Solo devuelve progreso del usuario correcto');
        } else {
            console.log('✗ Devuelve progreso de otros usuarios');
        }
        
        console.log('\nTests completados');
        
    } catch (error) {
        console.error('Error en tests:', error.message);
    } finally {
        await User.deleteOne({ email });
        await User.deleteOne({ email: 'other@test.com' });
        await Habit.deleteMany({ name: { $in: ['Ejercicio diario', 'Hábito de otro usuario'] } });
        await Progress.deleteMany({ date: new Date().toISOString().split('T')[0] });
        await db.disconnect();
    }
}

// Ejecutar los tests
testGetProgress(); 