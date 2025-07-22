import 'dotenv/config';
import db, { User } from 'dat';
import getUserName from './getUserName.js';
import registerUser from './registerUser.js';

// Tests para getUserName
async function testGetUserName() {
    let testUser;
    const email = 'testuser_name@example.com';
    const username = 'testusername';

    try {
        await db.connect(process.env.MONGO_URL_TEST);
        
        // Limpiar datos de prueba
        await User.deleteOne({ email });
        
        // Crear usuario de prueba
        testUser = await registerUser('Test User Name', email, username, 'password123', 'password123');
        
        // Test 1: Obtener nombre de usuario exitosamente
        console.log('Test 1: Obtener nombre de usuario exitosamente');
        const userName = await getUserName(testUser._id.toString(), testUser._id.toString());
        
        if (userName && userName === 'Test User Name') {
            console.log('✓ Nombre de usuario obtenido correctamente');
        } else {
            console.log('✗ Nombre de usuario no se obtuvo correctamente');
        }
        
        // Test 2: Intentar obtener con user ID inválido
        console.log('Test 2: Intentar obtener con user ID inválido');
        try {
            await getUserName('invalid-user-id', testUser._id.toString());
            console.log('✗ Debería haber fallado con user ID inválido');
        } catch (error) {
            console.log('✓ Correctamente rechazó user ID inválido');
        }
        
        // Test 3: Intentar obtener nombre de usuario inexistente
        console.log('Test 3: Intentar obtener nombre de usuario inexistente');
        try {
            await getUserName(testUser._id.toString(), '507f1f77bcf86cd799439011'); // ID válido pero inexistente
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
testGetUserName(); 