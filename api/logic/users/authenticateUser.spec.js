import 'dotenv/config';
import db, { User } from 'dat';
import authenticateUser from './authenticateUser.js';
import registerUser from './registerUser.js';

// Tests para authenticateUser
async function testAuthenticateUser() {
    const email = 'testuser_auth@example.com';
    const username = 'testuserauth';
    const password = 'password123';

    try {
        await db.connect(process.env.MONGO_URL_TEST);
        
        // Limpiar datos de prueba
        await User.deleteOne({ email });
        
        // Test 1: Autenticar usuario válido
        console.log('Test 1: Autenticar usuario válido');
        await registerUser('Test User Auth', email, username, password, password);
        const result = await authenticateUser(username, password);
        
        if (result && result.token && result.user && result.user.username === username) {
            console.log('✓ Usuario autenticado correctamente');
        } else {
            console.log('✗ Usuario no se autenticó correctamente');
        }
        
        // Test 2: Intentar autenticar con username incorrecto
        console.log('Test 2: Intentar autenticar con username incorrecto');
        try {
            await authenticateUser('invalidusername', password);
            console.log('✗ Debería haber fallado con username incorrecto');
        } catch (error) {
            console.log('✓ Correctamente rechazó username incorrecto');
        }
        
        // Test 3: Intentar autenticar con password incorrecto
        console.log('Test 3: Intentar autenticar con password incorrecto');
        try {
            await authenticateUser(username, 'wrongpassword');
            console.log('✗ Debería haber fallado con password incorrecto');
        } catch (error) {
            console.log('✓ Correctamente rechazó password incorrecto');
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
testAuthenticateUser();
