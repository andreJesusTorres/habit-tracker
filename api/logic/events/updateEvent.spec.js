import 'dotenv/config';
import db, { User, Event } from 'dat';
import updateEvent from './updateEvent.js';
import registerUser from '../users/registerUser.js';

// Tests para updateEvent
async function testUpdateEvent() {
    let testUser;
    let testEvent;
    const email = 'testuser_updateevent@example.com';
    const username = 'testuserupdateevent';

    try {
        await db.connect(process.env.MONGO_URL_TEST);
        
        // Limpiar datos de prueba
        await User.deleteOne({ email });
        await Event.deleteMany({ name: { $in: ['Evento original', 'Evento actualizado'] } });
        
        // Crear usuario de prueba
        testUser = await registerUser('Test User UpdateEvent', email, username, 'password123', 'password123');
        
        // Crear evento de prueba
        testEvent = await Event.create({
            user: testUser._id,
            name: 'Evento original',
            description: 'Descripción original',
            startDate: new Date(),
            frequency: 'once'
        });
        
        // Test 1: Actualizar evento exitosamente
        console.log('Test 1: Actualizar evento exitosamente');
        const updateData = {
            name: 'Evento actualizado',
            description: 'Descripción actualizada',
            frequency: 'weekly'
        };
        
        const updatedEvent = await updateEvent(testUser._id.toString(), testEvent._id.toString(), updateData);
        
        if (updatedEvent && updatedEvent.name === 'Evento actualizado' && updatedEvent.description === 'Descripción actualizada') {
            console.log('✓ Evento actualizado correctamente');
        } else {
            console.log('✗ Evento no se actualizó correctamente');
        }
        
        // Test 2: Intentar actualizar con event ID inválido
        console.log('Test 2: Intentar actualizar con event ID inválido');
        try {
            await updateEvent(testUser._id.toString(), 'invalid-event-id', updateData);
            console.log('✗ Debería haber fallado con event ID inválido');
        } catch (error) {
            console.log('✓ Correctamente rechazó event ID inválido');
        }
        
        // Test 3: Intentar actualizar con frecuencia inválida
        console.log('Test 3: Intentar actualizar con frecuencia inválida');
        const invalidUpdateData = {
            name: 'Evento inválido',
            frequency: 'invalid-frequency'
        };
        
        try {
            await updateEvent(testUser._id.toString(), testEvent._id.toString(), invalidUpdateData);
            console.log('✗ Debería haber fallado con frecuencia inválida');
        } catch (error) {
            console.log('✓ Correctamente rechazó frecuencia inválida');
        }
        
        console.log('\nTests completados');
        
    } catch (error) {
        console.error('Error en tests:', error.message);
    } finally {
        await User.deleteOne({ email });
        await Event.deleteMany({ name: { $in: ['Evento original', 'Evento actualizado'] } });
        await db.disconnect();
    }
}

// Ejecutar los tests
testUpdateEvent(); 