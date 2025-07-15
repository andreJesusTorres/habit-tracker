import 'dotenv/config';
import db, { User, Event } from 'dat';
import deleteEvent from './deleteEvent.js';

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
            // Eliminar el evento
            await deleteEvent(event._id.toString(), user._id.toString());
            console.log('✅ Evento eliminado exitosamente');
        } catch (error) {
            console.error('❌ Error al eliminar evento:', error.message);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect());