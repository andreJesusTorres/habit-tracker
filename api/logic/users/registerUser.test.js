import 'dotenv/config';
import db from 'dat';
import registerUser from './registerUser.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(() => 
        registerUser('Test User', 'test@example.com', 'testuser', 'password123', 'password123')
        .then(() => console.log('✅ Usuario registrado exitosamente'))
        .catch(error => console.error('❌ Error al registrar usuario:', error.message))
    )
    .catch(console.error)
    .finally(() => db.disconnect()); 