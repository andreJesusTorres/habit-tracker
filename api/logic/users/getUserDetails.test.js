import 'dotenv/config';
import db, { User } from 'dat';
import getUserDetails from './getUserDetails.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(async () => {
        try {
            // Buscar usuario existente
            const user = await User.findOne({ email: 'test@example.com' });
            if (!user) {
                console.log('❌ No se encontró usuario de prueba. Ejecuta primero registerUser.test.js');
                return;
            }
            
            // Obtener detalles del usuario
            const userDetails = await getUserDetails({ userId: user._id.toString() });
            console.log('✅ Detalles del usuario obtenidos exitosamente:', userDetails);
            
        } catch (error) {
            console.error('❌ Error al obtener detalles del usuario:', error.message);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect()); 