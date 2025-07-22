import 'dotenv/config';
import db, { User, Goal, Habit } from 'dat';
import addGoal from './addGoal.js';
import registerUser from '../users/registerUser.js';

// Tests para addGoal
async function testAddGoal() {
    let testUser;
    let testHabit;
    const email = 'testuser_goal@example.com';
    const username = 'testusergoal';

    try {
        await db.connect(process.env.MONGO_URL_TEST);
        
        // Limpiar datos de prueba
        await User.deleteOne({ email });
        await Goal.deleteMany({ name: 'Meta de ejercicio' });
        await Habit.deleteMany({ name: 'Ejercicio diario' });
        
        // Crear usuario de prueba
        testUser = await registerUser('Test User Goal', email, username, 'password123', 'password123');
        
        // Crear hábito de prueba
        testHabit = await Habit.create({
            user: testUser._id,
            name: 'Ejercicio diario',
            category: 'actividad física',
            emoji: '🏋️'
        });
        
        // Test 1: Crear meta exitosamente
        console.log('Test 1: Crear meta exitosamente');
        const goalData = {
            name: 'Meta de ejercicio',
            period: 'monthly',
            objective: 30,
            targetDays: 30
        };
        
        const goal = await addGoal(testUser._id.toString(), testHabit._id.toString(), goalData);
        
        if (goal && goal.name === 'Meta de ejercicio' && goal.period === 'monthly') {
            console.log('✓ Meta creada correctamente');
        } else {
            console.log('✗ Meta no se creó correctamente');
        }
        
        // Test 2: Intentar crear meta con período inválido
        console.log('Test 2: Intentar crear meta con período inválido');
        const invalidGoalData = {
            name: 'Meta inválida',
            period: 'invalid-period',
            objective: 30,
            targetDays: 30
        };
        
        try {
            await addGoal(testUser._id.toString(), testHabit._id.toString(), invalidGoalData);
            console.log('✗ Debería haber fallado con período inválido');
        } catch (error) {
            console.log('✓ Correctamente rechazó período inválido');
        }
        
        // Test 3: Intentar crear meta con user ID inválido
        console.log('Test 3: Intentar crear meta con user ID inválido');
        try {
            await addGoal('invalid-user-id', testHabit._id.toString(), goalData);
            console.log('✗ Debería haber fallado con user ID inválido');
        } catch (error) {
            console.log('✓ Correctamente rechazó user ID inválido');
        }
        
        console.log('\nTests completados');
        
    } catch (error) {
        console.error('Error en tests:', error.message);
    } finally {
        await User.deleteOne({ email });
        await Goal.deleteMany({ name: 'Meta de ejercicio' });
        await Habit.deleteMany({ name: 'Ejercicio diario' });
        await db.disconnect();
    }
}

// Ejecutar los tests
testAddGoal();
