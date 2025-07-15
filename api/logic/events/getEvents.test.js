import 'dotenv/config';
import db, { User, Event } from 'dat';
import getEvents from './getEvents.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(async () => {
        try {
            // Limpiar datos de prueba existentes
            await User.deleteMany({ email: 'test@example.com' });
            await Event.deleteMany({ title: { $in: ['Reunión de trabajo', 'Cita médica'] } });
            
            // Crear usuario de prueba
            const user = await User.create({
                name: 'Usuario Test',
                email: 'test@example.com',
                username: 'testuser',
                password: 'password123',
                role: 'regular'
            });
            
            // Crear algunos eventos de prueba
            await Event.create([
                {
                    userId: user._id,
                    title: 'Reunión de trabajo',
                    description: 'Reunión semanal del equipo',
                    startTime: '2024-11-15T10:00:00Z',
                    endTime: '2024-11-15T11:00:00Z',
                    category: 'trabajo'
                },
                {
                    userId: user._id,
                    title: 'Cita médica',
                    description: 'Revisión anual',
                    startTime: '2024-11-16T14:00:00Z',
                    endTime: '2024-11-16T15:00:00Z',
                    category: 'salud'
                }
            ]);
            
            // Obtener eventos del usuario
            const events = await getEvents(user._id.toString());
            console.log('✅ Eventos obtenidos exitosamente:', events.length, 'eventos encontrados');
            
        } catch (error) {
            console.error('❌ Error al obtener eventos:', error.message);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect());
