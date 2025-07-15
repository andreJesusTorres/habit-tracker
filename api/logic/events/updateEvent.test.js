import 'dotenv/config';
import db, { User, Event } from 'dat';
import updateEvent from './updateEvent.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(async () => {
        try {
            // Limpiar datos de prueba existentes
            await User.deleteMany({ email: 'test@example.com' });
            await Event.deleteMany({ name: 'Reunión de trabajo' });
            
            // Crear usuario de prueba
            const user = await User.create({
                name: 'Usuario Test',
                email: 'test@example.com',
                username: 'testuser',
                password: 'password123',
                role: 'regular'
            });
            // Crear evento de prueba
            const event = await Event.create({
                user: user._id,
                name: 'Reunión de trabajo',
                description: 'Reunión semanal del equipo',
                startDate: new Date('2024-11-15T10:00:00Z'),
                endDate: new Date('2024-11-15T11:00:00Z'),
                frequency: 'weekly'
            });
            // Actualizar el evento
            const updatedEvent = await updateEvent(
                event._id.toString(),
                'Reunión de equipo actualizada',
                'Reunión semanal del equipo de desarrollo',
                new Date('2024-11-15T11:00:00Z'),
                new Date('2024-11-15T12:00:00Z'),
                'weekly'
            );
            console.log('✅ Evento actualizado exitosamente:', updatedEvent.name);
        } catch (error) {
            console.error('❌ Error al actualizar evento:', error.message);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect());
