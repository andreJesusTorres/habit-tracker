import 'dotenv/config';
import db, { User, Goal, Habit } from 'dat';
import getGoals from './getGoals.js';
import registerUser from '../users/registerUser.js';

// Tests para getGoals
async function testGetGoals() {
    let testUser;
    let testHabit;
    const email = 'testuser_goals@example.com';
    const username = 'testusergoals';

    try {
        await db.connect(process.env.MONGO_URL_TEST);
        
        // Limpiar datos de prueba
        await User.deleteOne({ email });
        await Goal.deleteMany({ name: { $in: ['Meta 1', 'Meta 2'] } });
        await Habit.deleteMany({ name: 'Ejercicio diario' });
        
        // Crear usuario de prueba
        testUser = await registerUser('Test User Goals', email, username, 'password123', 'password123');
        
        // Crear hábito de prueba
        testHabit = await Habit.create({
            user: testUser._id,
            name: 'Ejercicio diario',
            category: 'actividad física',
            emoji: '🏋️'
        });
        
        // Test 1: Obtener metas cuando no hay ninguna
        console.log('Test 1: Obtener metas cuando no hay ninguna');
        const emptyGoals = await getGoals(testUser._id.toString());
        
        if (Array.isArray(emptyGoals) && emptyGoals.length === 0) {
            console.log('✓ Lista vacía correctamente');
        } else {
            console.log('✗ No devolvió lista vacía');
        }
        
        // Crear algunas metas de prueba
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1); // Un mes después
        
        await Goal.create([
            {
                user: testUser._id,
                habit: testHabit._id,
                name: 'Meta 1',
                period: 'monthly',
                objective: 30,
                targetDays: 30,
                endDate: endDate
            },
            {
                user: testUser._id,
                habit: testHabit._id,
                name: 'Meta 2',
                period: 'weekly',
                objective: 7,
                targetDays: 7,
                endDate: endDate
            }
        ]);
        
        // Test 2: Obtener metas del usuario
        console.log('Test 2: Obtener metas del usuario');
        const goals = await getGoals(testUser._id.toString());
        
        if (Array.isArray(goals) && goals.length === 2) {
            console.log('✓ Metas obtenidas correctamente');
        } else {
            console.log('✗ No se obtuvieron las metas correctamente');
        }
        
        // Test 3: Verificar que solo devuelve metas del usuario correcto
        console.log('Test 3: Verificar que solo devuelve metas del usuario correcto');
        const otherUser = await registerUser('Other User', 'other@test.com', 'otheruser', 'password123', 'password123');
        
        await Goal.create({
            user: otherUser._id,
            habit: testHabit._id,
            name: 'Meta de otro usuario',
            period: 'monthly',
            objective: 30,
            targetDays: 30,
            endDate: endDate
        });
        
        const userGoals = await getGoals(testUser._id.toString());
        
        if (userGoals.length === 2 && userGoals.every(g => g.user.toString() === testUser._id.toString())) {
            console.log('✓ Solo devuelve metas del usuario correcto');
        } else {
            console.log('✗ Devuelve metas de otros usuarios');
        }
        
        console.log('\nTests completados');
        
    } catch (error) {
        console.error('Error en tests:', error.message);
    } finally {
        await User.deleteOne({ email });
        await User.deleteOne({ email: 'other@test.com' });
        await Goal.deleteMany({ name: { $in: ['Meta 1', 'Meta 2', 'Meta de otro usuario'] } });
        await Habit.deleteMany({ name: 'Ejercicio diario' });
        await db.disconnect();
    }
}

// Ejecutar los tests
testGetGoals(); 