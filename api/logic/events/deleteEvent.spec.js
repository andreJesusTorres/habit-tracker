import 'dotenv/config';
import db, { User, Event } from 'dat';
import deleteEvent from './deleteEvent.js';
import registerUser from '../users/registerUser.js';

// Tests para deleteEvent
async function testDeleteEvent() {
    let testUser;
    let testEvent;
    const email = 'testuser_deleteevent@example.com';
    const username = 'testuserdeleteevent';

    try {
        await db.connect(process.env.MONGO_URL_TEST);
        
        // Limpiar datos de prueba
        await User.deleteOne({ email });
        await Event.deleteMany({ name: 'Evento para eliminar' });
        
        // Crear usuario de prueba
        testUser = await registerUser('Test User DeleteEvent', email, username, 'password123', 'password123');
        
        // Crear evento de prueba
        testEvent = await Event.create({
            user: testUser._id,
            name: 'Evento para eliminar',
            description: 'Descripción del evento',
            startDate: new Date(),
            frequency: 'once'
        });
        
        // Test 1: Eliminar evento exitosamente
        console.log('Test 1: Eliminar evento exitosamente');
        const result = await deleteEvent(testUser._id.toString(), testEvent._id.toString());
        
        if (result && result.success) {
            console.log('✓ Evento eliminado correctamente');
        } else {
            console.log('✗ Evento no se eliminó correctamente');
        }
        
        // Verificar que el evento ya no existe
        const deletedEvent = await Event.findById(testEvent._id);
        if (!deletedEvent) {
            console.log('✓ Evento efectivamente eliminado de la base de datos');
        } else {
            console.log('✗ Evento aún existe en la base de datos');
        }
        
        // Test 2: Intentar eliminar con event ID inválido
        console.log('Test 2: Intentar eliminar con event ID inválido');
        try {
            await deleteEvent(testUser._id.toString(), 'invalid-event-id');
            console.log('✗ Debería haber fallado con event ID inválido');
        } catch (error) {
            console.log('✓ Correctamente rechazó event ID inválido');
        }
        
        // Test 3: Intentar eliminar evento inexistente
        console.log('Test 3: Intentar eliminar evento inexistente');
        try {
            await deleteEvent(testUser._id.toString(), testUser._id.toString()); // Usar ID de usuario como evento inexistente
            console.log('✗ Debería haber fallado con evento inexistente');
        } catch (error) {
            console.log('✓ Correctamente rechazó evento inexistente');
        }
        
        console.log('\nTests completados');
        
    } catch (error) {
        console.error('Error en tests:', error.message);
    } finally {
        await User.deleteOne({ email });
        await Event.deleteMany({ name: 'Evento para eliminar' });
        await db.disconnect();
    }
}

// Ejecutar los tests
testDeleteEvent(); 