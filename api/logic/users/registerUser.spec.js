import 'dotenv/config';
import db, { User } from 'dat';
import registerUser from './registerUser.js';

// Tests para registerUser
async function testRegisterUser() {
    const email = 'testuser_indep@example.com';
    const username = 'testuserindep';

    try {
        await db.connect(process.env.MONGO_URL_TEST);
        
        // Limpiar datos de prueba
        await User.deleteOne({ email });
        
        // Test 1: Registrar usuario exitosamente
        console.log('Test 1: Registrar usuario exitosamente');
        const result = await registerUser('Test User Indep', email, username, 'password123', 'password123');
        
        if (result && result.email === email && result.username === username) {
            console.log('✓ Usuario registrado correctamente');
        } else {
            console.log('✗ Usuario no se registró correctamente');
        }
        
        // Test 2: Intentar registrar usuario con email duplicado
        console.log('Test 2: Intentar registrar usuario con email duplicado');
        try {
            await registerUser('Test User 2', email, 'differentusername', 'password123', 'password123');
            console.log('✗ Debería haber fallado con email duplicado');
        } catch (error) {
            console.log('✓ Correctamente rechazó email duplicado');
        }
        
        // Test 3: Intentar registrar con passwords diferentes
        console.log('Test 3: Intentar registrar con passwords diferentes');
        try {
            await registerUser('Test User 3', 'test3@example.com', 'testuser3', 'password123', 'differentpassword');
            console.log('✗ Debería haber fallado con passwords diferentes');
        } catch (error) {
            console.log('✓ Correctamente rechazó passwords diferentes');
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
testRegisterUser();
