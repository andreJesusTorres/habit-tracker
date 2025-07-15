import 'dotenv/config';
import db, { User, Progress } from 'dat';
import getProgress from './getProgress.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(async () => {
        try {
            // Limpiar datos de prueba existentes
            await User.deleteMany({ email: 'test@example.com' });
            await Progress.deleteMany({ notes: { $in: ['Progreso de prueba 1', 'Progreso de prueba 2'] } });
            
            // Crear usuario de prueba
            const user = await User.create({
                name: 'Usuario Test',
                email: 'test@example.com',
                username: 'testuser',
                password: 'password123',
                role: 'regular'
            });
            
            // Crear algunos registros de progreso de prueba
            await Progress.create([
                {
                    userId: user._id,
                    date: '2024-11-15',
                    notes: 'Progreso de prueba 1',
                    percentage: 85,
                    description: 'Buen progreso en el ejercicio'
                },
                {
                    userId: user._id,
                    date: '2024-11-16',
                    notes: 'Progreso de prueba 2',
                    percentage: 90,
                    description: 'Excelente progreso en la lectura'
                }
            ]);
            
            // Obtener progreso del usuario
            const progress = await getProgress(user._id.toString());
            console.log('✅ Progreso obtenido exitosamente:', progress.length, 'registros encontrados');
            
        } catch (error) {
            console.error('❌ Error al obtener progreso:', error.message);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect());
