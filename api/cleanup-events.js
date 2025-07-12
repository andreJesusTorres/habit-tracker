import db, { Event } from '../dat/index.js';

console.log('🔧 Conectando a MongoDB...');
await db.connect('mongodb://localhost:27017/abel');
console.log('🔧 Conectado. Buscando eventos inválidos...');

const events = await Event.find({});
let invalidCount = 0;
let validCount = 0;

for (const event of events) {
    const startDate = event.startDate;
    const endDate = event.endDate;
    const invalidStart = !startDate || isNaN(new Date(startDate).getTime());
    const invalidEnd = endDate && isNaN(new Date(endDate).getTime());
    if (invalidStart || invalidEnd) {
        console.log(`🔧 Eliminando evento inválido: ${event._id} - startDate: ${startDate}, endDate: ${endDate}`);
        await Event.deleteOne({ _id: event._id });
        invalidCount++;
    } else {
        validCount++;
    }
}

console.log(`🔧 Limpieza completada:`);
console.log(`🔧 - Eventos válidos: ${validCount}`);
console.log(`🔧 - Eventos eliminados: ${invalidCount}`);

await db.disconnect(); 