import 'dotenv/config';
import db, { User, Event } from 'dat';
import addEvent from './addEvent.js';

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
            
            const eventId = await addEvent(
                user._id.toString(),
                'Reunión de trabajo',
                new Date('2024-11-15T10:00:00Z'),
                'Reunión semanal del equipo',
                new Date('2024-11-15T11:00:00Z'),
                'weekly'
            );
            console.log('✅ Evento creado exitosamente:', eventId);
        } catch (error) {
            console.error('❌ Error al crear evento:', error.message);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect()); 