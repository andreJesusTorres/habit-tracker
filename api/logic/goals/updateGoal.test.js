import 'dotenv/config';
import db from 'dat';
import updateGoal from './updateGoal.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            const userId = '675ace02a28a390d912bc40e'; // Cambia este ID según tus datos de prueba
            const goalId = '67950bd03dfd8073c15b1343'; // Cambia este ID según tus datos de prueba
            const updates = {
                description: 'Ahorrar 200€',
                period: 'weekly',
                objective: 200,
            };

            return updateGoal(userId, goalId, updates)
                .then(console.log) // Resultado: Goal actualizado
                .catch(console.error);
        } catch (error) {
            console.error(error);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect());
