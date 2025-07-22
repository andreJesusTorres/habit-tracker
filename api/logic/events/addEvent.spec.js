import 'dotenv/config';
import db, { User, Event } from 'dat';
import addEvent from './addEvent.js';
import registerUser from '../users/registerUser.js';

// Tests para addEvent
async function testAddEvent() {
    let testUser;
    const email = 'testuser_event@example.com';
    const username = 'testuserevent';

    try {
        await db.connect(process.env.MONGO_URL_TEST);
        
        // Limpiar datos de prueba
        await User.deleteOne({ email });
        await Event.deleteMany({ title: 'Evento de prueba' });
        
        // Crear usuario de prueba
        testUser = await registerUser('Test User Event', email, username, 'password123', 'password123');
        
        // Test 1: Crear evento exitosamente
        console.log('Test 1: Crear evento exitosamente');
        const eventData = {
            title: 'Evento de prueba',
            description: 'Descripción del evento',
            date: new Date().toISOString(),
            location: 'Lugar del evento'
        };
        
        const event = await addEvent(testUser._id.toString(), eventData);
        
        if (event && event.title === 'Evento de prueba' && event.description === 'Descripción del evento') {
            console.log('✓ Evento creado correctamente');
        } else {
            console.log('✗ Evento no se creó correctamente');
        }
        
        // Test 2: Intentar crear evento con user ID inválido
        console.log('Test 2: Intentar crear evento con user ID inválido');
        try {
            await addEvent('invalid-user-id', eventData);
            console.log('✗ Debería haber fallado con user ID inválido');
        } catch (error) {
            console.log('✓ Correctamente rechazó user ID inválido');
        }
        
        // Test 3: Intentar crear evento sin título
        console.log('Test 3: Intentar crear evento sin título');
        const invalidEventData = {
            description: 'Descripción del evento',
            date: new Date().toISOString()
        };
        
        try {
            await addEvent(testUser._id.toString(), invalidEventData);
            console.log('✗ Debería haber fallado sin título');
        } catch (error) {
            console.log('✓ Correctamente rechazó evento sin título');
        }
        
        console.log('\nTests completados');
        
    } catch (error) {
        console.error('Error en tests:', error.message);
    } finally {
        await User.deleteOne({ email });
        await Event.deleteMany({ title: 'Evento de prueba' });
        await db.disconnect();
    }
}

// Ejecutar los tests
testAddEvent(); 