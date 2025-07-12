const mongoose = require('mongoose');
const { Event } = require('dat');

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/abel', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function cleanupInvalidEvents() {
    try {
        console.log('🔧 Starting cleanup of invalid events...');
        
        // Obtener todos los eventos
        const events = await Event.find({});
        console.log(`🔧 Found ${events.length} total events`);
        
        let invalidCount = 0;
        let validCount = 0;
        
        for (const event of events) {
            try {
                // Intentar crear una fecha válida
                const startDate = new Date(event.startTime || event.startDate);
                if (isNaN(startDate.getTime())) {
                    console.log(`🔧 Deleting invalid event: ${event._id} - startTime: ${event.startTime}, startDate: ${event.startDate}`);
                    await Event.deleteOne({ _id: event._id });
                    invalidCount++;
                } else {
                    validCount++;
                }
            } catch (error) {
                console.log(`🔧 Deleting event with error: ${event._id} - ${error.message}`);
                await Event.deleteOne({ _id: event._id });
                invalidCount++;
            }
        }
        
        console.log(`🔧 Cleanup completed:`);
        console.log(`🔧 - Valid events: ${validCount}`);
        console.log(`🔧 - Deleted invalid events: ${invalidCount}`);
        
    } catch (error) {
        console.error('🔧 Error during cleanup:', error);
    } finally {
        mongoose.connection.close();
    }
}

cleanupInvalidEvents(); 