import 'dotenv/config';
import db, { User } from 'dat';
import updateUser from './updateUser.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(async () => {
        try {
            // Buscar usuario existente
            const user = await User.findOne({ email: 'test@example.com' });
            if (!user) {
                console.log('❌ No se encontró usuario de prueba. Ejecuta primero registerUser.test.js');
                return;
            }
            
            // Actualizar datos del usuario
            const updatedUser = await updateUser(user._id.toString(), {
                name: 'Usuario Actualizado',
                email: 'actualizado@example.com'
            });
            console.log('✅ Usuario actualizado exitosamente:', updatedUser.name);
            
        } catch (error) {
            console.error('❌ Error al actualizar usuario:', error.message);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect()); 