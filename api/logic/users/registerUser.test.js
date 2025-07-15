import 'dotenv/config';
import db, { User } from 'dat';
import registerUser from './registerUser.js';

const email = 'testuser_indep@example.com';
const username = 'testuserindep';

db.connect(process.env.MONGO_URL_TEST)
    .then(async () => {
        try {
            // Borrar usuario de prueba si existe
            await User.deleteOne({ email });
            // Registrar usuario
            await registerUser('Test User Indep', email, username, 'password123', 'password123');
            console.log('✅ Usuario registrado exitosamente');
        } catch (error) {
            console.error('❌ Error al registrar usuario:', error.message);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect()); 