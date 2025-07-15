import 'dotenv/config';
import db, { User } from 'dat';
import addEvent from './addEvent.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(async () => {
        try {
            const user = await User.findOne({ email: 'test@example.com' });
            if (!user) {
                console.log('❌ No se encontró usuario de prueba. Ejecuta primero registerUser.test.js');
                return;
            }
            
            const eventId = await addEvent(
                user._id.toString(),
                'Reunión de equipo',
                new Date('2025-01-30T10:00:00.000Z'),
                'Reunión semanal del equipo de desarrollo',
                new Date('2025-01-30T11:00:00.000Z'),
                'weekly'
            );
            console.log('✅ Evento creado exitosamente. ID:', eventId);
        } catch (error) {
            console.error('❌ Error al crear evento:', error.message);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect()); 