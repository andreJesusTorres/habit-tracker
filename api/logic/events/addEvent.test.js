import 'dotenv/config'
import db from 'dat'
import addEvent from './addEvent.js'

console.log('🧪 Testing de addEvent...')

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            console.log('📝 Probando agregar evento...')
            // Usar un userId válido (puedes ajustar este ID según tu BD)
            const userId = '688dfcd551859ebc37fb24f3'
            const name = 'Evento de Testing'
            const startDate = new Date().toISOString()
            const description = 'Evento para testing'
            const endDate = new Date(Date.now() + 3600000).toISOString() // 1 hora después
            const frequency = 'once'
            
            return addEvent(userId, name, startDate, description, endDate, frequency)
                .then(result => {
                    console.log('✅ Resultado de agregar evento:', result)
                })
                .catch(error => {
                    console.error('❌ Error al agregar evento:', error.message)
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