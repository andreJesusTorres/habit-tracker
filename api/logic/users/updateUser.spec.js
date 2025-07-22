import 'dotenv/config';
import db, { User } from 'dat';
import updateUser from './updateUser.js';
import registerUser from './registerUser.js';

// Tests para updateUser
async function testUpdateUser() {
    let testUser;
    const email = 'testuser_update@example.com';
    const username = 'testuserupdate';

    try {
        await db.connect(process.env.MONGO_URL_TEST);
        
        // Limpiar datos de prueba
        await User.deleteOne({ email });
        
        // Crear usuario de prueba
        testUser = await registerUser('Test User Update', email, username, 'password123', 'password123');
        
        // Test 1: Actualizar usuario exitosamente
        console.log('Test 1: Actualizar usuario exitosamente');
        const updateData = {
            name: 'Test User Updated',
            email: 'updated@test.com'
        };
        
        const updatedUser = await updateUser(testUser._id.toString(), updateData);
        
        if (updatedUser && updatedUser.name === 'Test User Updated' && updatedUser.email === 'updated@test.com') {
            console.log('✓ Usuario actualizado correctamente');
        } else {
            console.log('✗ Usuario no se actualizó correctamente');
        }
        
        // Test 2: Intentar actualizar con user ID inválido
        console.log('Test 2: Intentar actualizar con user ID inválido');
        try {
            await updateUser('invalid-user-id', updateData);
            console.log('✗ Debería haber fallado con user ID inválido');
        } catch (error) {
            console.log('✓ Correctamente rechazó user ID inválido');
        }
        
        // Test 3: Intentar actualizar con email inválido
        console.log('Test 3: Intentar actualizar con email inválido');
        const invalidUpdateData = {
            name: 'Test User',
            email: 'invalid-email'
        };
        
        try {
            await updateUser(testUser._id.toString(), invalidUpdateData);
            console.log('✗ Debería haber fallado con email inválido');
        } catch (error) {
            console.log('✓ Correctamente rechazó email inválido');
        }
        
        console.log('\nTests completados');
        
    } catch (error) {
        console.error('Error en tests:', error.message);
    } finally {
        await User.deleteOne({ email });
        await User.deleteOne({ email: 'updated@test.com' });
        await db.disconnect();
    }
}

// Ejecutar los tests
testUpdateUser(); 