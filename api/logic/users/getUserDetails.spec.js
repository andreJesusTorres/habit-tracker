import 'dotenv/config';
import db, { User } from 'dat';
import getUserDetails from './getUserDetails.js';
import registerUser from './registerUser.js';

// Tests para getUserDetails
async function testGetUserDetails() {
    let testUser;
    const email = 'testuser_details@example.com';
    const username = 'testuserdetails';

    try {
        await db.connect(process.env.MONGO_URL_TEST);
        
        // Limpiar datos de prueba
        await User.deleteOne({ email });
        
        // Crear usuario de prueba
        testUser = await registerUser('Test User Details', email, username, 'password123', 'password123');
        
        // Test 1: Obtener detalles de usuario exitosamente
        console.log('Test 1: Obtener detalles de usuario exitosamente');
        const userDetails = await getUserDetails({ userId: testUser._id.toString() });
        
        if (userDetails && userDetails.name === 'Test User Details' && userDetails.email === email) {
            console.log('✓ Detalles de usuario obtenidos correctamente');
        } else {
            console.log('✗ Detalles de usuario no se obtuvieron correctamente');
        }
        
        // Test 2: Intentar obtener con user ID inválido
        console.log('Test 2: Intentar obtener con user ID inválido');
        try {
            await getUserDetails({ userId: 'invalid-user-id' });
            console.log('✗ Debería haber fallado con user ID inválido');
        } catch (error) {
            console.log('✓ Correctamente rechazó user ID inválido');
        }
        
        // Test 3: Intentar obtener usuario inexistente
        console.log('Test 3: Intentar obtener usuario inexistente');
        try {
            await getUserDetails({ userId: '507f1f77bcf86cd799439011' }); // ID válido pero inexistente
            console.log('✗ Debería haber fallado con usuario inexistente');
        } catch (error) {
            console.log('✓ Correctamente rechazó usuario inexistente');
        }
        
        console.log('\nTests completados');
        
    } catch (error) {
        console.error('Error en tests:', error.message);
    } finally {
        await User.deleteOne({ email });
        await db.disconnect();
    }
}

// Ejecutar los tests
testGetUserDetails(); 