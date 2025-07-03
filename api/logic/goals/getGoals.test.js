import 'dotenv/config';
import db from 'dat';
import getGoals from './getGoals.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            const userId = '675ace02a28a390d912bc40e'; // Cambia este ID según tus datos de prueba

            return getGoals(userId)
                .then(console.log) // Resultado: Lista de goals
                .catch(console.error);
        } catch (error) {
            console.error(error);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect());
