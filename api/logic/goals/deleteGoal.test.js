import 'dotenv/config';
import db from 'dat';
import deleteGoal from './deleteGoal.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            const userId = '675ace02a28a390d912bc40e'; // Cambia este ID según tus datos de prueba
            const goalId = '67c99372b2afe423afc70f8e'; // Cambia este ID según tus datos de prueba

            return deleteGoal(userId, goalId)
                .then(console.log) // Resultado: Mensaje de eliminación o success
                .catch(console.error);
        } catch (error) {
            console.error(error);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect());
