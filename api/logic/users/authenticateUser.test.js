import 'dotenv/config';
import db, { User } from 'dat';
import authenticateUser from './authenticateUser.js';
import registerUser from './registerUser.js';

const email = 'testuser_auth@example.com';
const username = 'testuserauth';
const password = 'password123';

db.connect(process.env.MONGO_URL_TEST)
    .then(async () => {
        try {
            // Borrar usuario de prueba si existe y crearlo
            await User.deleteOne({ email });
            await registerUser('Test User Auth', email, username, password, password);
            // Autenticar
            const result = await authenticateUser(username, password);
            console.log('✅ Usuario autenticado exitosamente:', result);
        } catch (error) {
            console.error('❌ Error al autenticar usuario:', error.message);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect());