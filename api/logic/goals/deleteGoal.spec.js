import 'dotenv/config';
import db, { User, Goal, Habit } from 'dat';
import deleteGoal from './deleteGoal.js';
import registerUser from '../users/registerUser.js';

// Tests para deleteGoal
async function testDeleteGoal() {
    let testUser;
    let testHabit;
    let testGoal;
    const email = 'testuser_deletegoal@example.com';
    const username = 'testuserdeletegoal';

    try {
        await db.connect(process.env.MONGO_URL_TEST);
        
        // Limpiar datos de prueba
        await User.deleteOne({ email });
        await Goal.deleteMany({ name: 'Meta para eliminar' });
        await Habit.deleteMany({ name: 'Ejercicio diario' });
        
        // Crear usuario de prueba
        testUser = await registerUser('Test User DeleteGoal', email, username, 'password123', 'password123');
        
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
            name: 'Meta para eliminar',
            period: 'monthly',
            objective: 30,
            targetDays: 30,
            endDate: endDate
        });
        
        // Test 1: Eliminar meta exitosamente
        console.log('Test 1: Eliminar meta exitosamente');
        const result = await deleteGoal(testUser._id.toString(), testGoal._id.toString());
        
        if (result && result.message) {
            console.log('✓ Meta eliminada correctamente');
        } else {
            console.log('✗ Meta no se eliminó correctamente');
        }
        
        // Verificar que la meta ya no existe
        const deletedGoal = await Goal.findById(testGoal._id);
        if (!deletedGoal) {
            console.log('✓ Meta efectivamente eliminada de la base de datos');
        } else {
            console.log('✗ Meta aún existe en la base de datos');
        }
        
        // Test 2: Intentar eliminar con goal ID inválido
        console.log('Test 2: Intentar eliminar con goal ID inválido');
        try {
            await deleteGoal(testUser._id.toString(), 'invalid-goal-id');
            console.log('✗ Debería haber fallado con goal ID inválido');
        } catch (error) {
            console.log('✓ Correctamente rechazó goal ID inválido');
        }
        
        // Test 3: Intentar eliminar meta inexistente
        console.log('Test 3: Intentar eliminar meta inexistente');
        try {
            await deleteGoal(testUser._id.toString(), testUser._id.toString()); // Usar ID de usuario como meta inexistente
            console.log('✗ Debería haber fallado con meta inexistente');
        } catch (error) {
            console.log('✓ Correctamente rechazó meta inexistente');
        }
        
        console.log('\nTests completados');
        
    } catch (error) {
        console.error('Error en tests:', error.message);
    } finally {
        await User.deleteOne({ email });
        await Goal.deleteMany({ name: 'Meta para eliminar' });
        await Habit.deleteMany({ name: 'Ejercicio diario' });
        await db.disconnect();
    }
}

// Ejecutar los tests
testDeleteGoal(); 