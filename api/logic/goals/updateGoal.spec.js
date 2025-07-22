import 'dotenv/config';
import db, { User, Goal, Habit } from 'dat';
import updateGoal from './updateGoal.js';
import registerUser from '../users/registerUser.js';

// Tests para updateGoal
async function testUpdateGoal() {
    let testUser;
    let testHabit;
    let testGoal;
    const email = 'testuser_updategoal@example.com';
    const username = 'testuserupdategoal';

    try {
        await db.connect(process.env.MONGO_URL_TEST);
        
        // Limpiar datos de prueba
        await User.deleteOne({ email });
        await Goal.deleteMany({ name: { $in: ['Meta original', 'Meta actualizada'] } });
        await Habit.deleteMany({ name: 'Ejercicio diario' });
        
        // Crear usuario de prueba
        testUser = await registerUser('Test User UpdateGoal', email, username, 'password123', 'password123');
        
        // Crear hábito de prueba
        testHabit = await Habit.create({
            user: testUser._id,
            name: 'Ejercicio diario',
            category: 'actividad física',
            emoji: '🏋️'
        });
        
        // Crear meta de prueba
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1); // Un mes después
        
        testGoal = await Goal.create({
            user: testUser._id,
            habit: testHabit._id,
            name: 'Meta original',
            period: 'monthly',
            objective: 30,
            targetDays: 30,
            endDate: endDate
        });
        
        // Test 1: Actualizar meta exitosamente
        console.log('Test 1: Actualizar meta exitosamente');
        const updateData = {
            name: 'Meta actualizada',
            objective: 25,
            targetDays: 25
        };
        
        const updatedGoal = await updateGoal(testUser._id.toString(), testGoal._id.toString(), updateData);
        
        if (updatedGoal && updatedGoal.name === 'Meta actualizada' && updatedGoal.objective === 25) {
            console.log('✓ Meta actualizada correctamente');
        } else {
            console.log('✗ Meta no se actualizó correctamente');
        }
        
        // Test 2: Intentar actualizar con goal ID inválido
        console.log('Test 2: Intentar actualizar con goal ID inválido');
        try {
            await updateGoal(testUser._id.toString(), 'invalid-goal-id', updateData);
            console.log('✗ Debería haber fallado con goal ID inválido');
        } catch (error) {
            console.log('✓ Correctamente rechazó goal ID inválido');
        }
        
        // Test 3: Intentar actualizar con período inválido
        console.log('Test 3: Intentar actualizar con período inválido');
        const invalidUpdateData = {
            name: 'Meta inválida',
            period: 'invalid-period'
        };
        
        try {
            await updateGoal(testUser._id.toString(), testGoal._id.toString(), invalidUpdateData);
            console.log('✗ Debería haber fallado con período inválido');
        } catch (error) {
            console.log('✓ Correctamente rechazó período inválido');
        }
        
        console.log('\nTests completados');
        
    } catch (error) {
        console.error('Error en tests:', error.message);
    } finally {
        await User.deleteOne({ email });
        await Goal.deleteMany({ name: { $in: ['Meta original', 'Meta actualizada'] } });
        await Habit.deleteMany({ name: 'Ejercicio diario' });
        await db.disconnect();
    }
}

// Ejecutar los tests
testUpdateGoal(); 