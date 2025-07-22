import 'dotenv/config';
import db, { User, Event } from 'dat';
import getEvents from './getEvents.js';
import registerUser from '../users/registerUser.js';

// Tests para getEvents
async function testGetEvents() {
    let testUser;
    const email = 'testuser_getevents@example.com';
    const username = 'testusergetevents';

    try {
        await db.connect(process.env.MONGO_URL_TEST);
        
        // Limpiar datos de prueba
        await User.deleteOne({ email });
        await Event.deleteMany({ name: { $in: ['Evento 1', 'Evento 2'] } });
        
        // Crear usuario de prueba
        testUser = await registerUser('Test User GetEvents', email, username, 'password123', 'password123');
        
        // Test 1: Obtener eventos cuando no hay ninguno
        console.log('Test 1: Obtener eventos cuando no hay ninguno');
        const emptyEvents = await getEvents(testUser._id.toString());
        
        if (Array.isArray(emptyEvents) && emptyEvents.length === 0) {
            console.log('✓ Lista vacía correctamente');
        } else {
            console.log('✗ No devolvió lista vacía');
        }
        
        // Crear algunos eventos de prueba
        await Event.create([
            {
                user: testUser._id,
                name: 'Evento 1',
                description: 'Descripción del evento 1',
                startDate: new Date(),
                frequency: 'once'
            },
            {
                user: testUser._id,
                name: 'Evento 2',
                description: 'Descripción del evento 2',
                startDate: new Date(),
                frequency: 'weekly'
            }
        ]);
        
        // Test 2: Obtener eventos del usuario
        console.log('Test 2: Obtener eventos del usuario');
        const events = await getEvents(testUser._id.toString());
        
        if (Array.isArray(events) && events.length === 2) {
            console.log('✓ Eventos obtenidos correctamente');
        } else {
            console.log('✗ No se obtuvieron los eventos correctamente');
        }
        
        // Test 3: Verificar que solo devuelve eventos del usuario correcto
        console.log('Test 3: Verificar que solo devuelve eventos del usuario correcto');
        const otherUser = await registerUser('Other User', 'other@test.com', 'otheruser', 'password123', 'password123');
        
        await Event.create({
            user: otherUser._id,
            name: 'Evento de otro usuario',
            description: 'Descripción del evento de otro usuario',
            startDate: new Date(),
            frequency: 'once'
        });
        
        const userEvents = await getEvents(testUser._id.toString());
        
        if (userEvents.length === 2 && userEvents.every(e => e.user.toString() === testUser._id.toString())) {
            console.log('✓ Solo devuelve eventos del usuario correcto');
        } else {
            console.log('✗ Devuelve eventos de otros usuarios');
        }
        
        console.log('\nTests completados');
        
    } catch (error) {
        console.error('Error en tests:', error.message);
    } finally {
        await User.deleteOne({ email });
        await User.deleteOne({ email: 'other@test.com' });
        await Event.deleteMany({ name: { $in: ['Evento 1', 'Evento 2', 'Evento de otro usuario'] } });
        await db.disconnect();
    }
}

// Ejecutar los tests
testGetEvents(); 