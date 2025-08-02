import 'dotenv/config'
import db from 'dat'
import deleteEvent from './deleteEvent.js'

console.log('🧪 Testing de deleteEvent...')

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            console.log('📝 Probando eliminar evento...')
            // Usar IDs válidos (puedes ajustar estos IDs según tu BD)
            const eventId = '688dfcd651859ebc37fb24fd'
            const userId = '688dfcd551859ebc37fb24f3'
            
            return deleteEvent(eventId, userId)
                .then(result => {
                    console.log('✅ Resultado de eliminar evento:', result)
                })
                .catch(error => {
                    console.error('❌ Error al eliminar evento:', error.message)
                })
        } catch (error) {
            console.error('❌ Error general:', error)
        }
    })
    .catch(error => {
        console.error('❌ Error de conexión a BD:', error)
    })
    .finally(() => {
        console.log('🔌 Desconectando de la base de datos...')
        db.disconnect()
    }) 