import 'dotenv/config';
import db from 'dat';
import getProgress from './getProgress.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        return getProgress('675834522360edb20e32d420') // ID válido del hábito
            .then(console.log) // Verifica si se obtuvo el progreso correctamente
            .catch(console.error); // Muestra errores, si los hay
    })
    .catch(console.error)
    .finally(() => db.disconnect());
