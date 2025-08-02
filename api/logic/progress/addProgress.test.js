import 'dotenv/config'
import db from 'dat'
import addProgress from './addProgress.js'

console.log('🧪 Testing de addProgress...')

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            console.log('📝 Probando agregar progreso...')
            // Usar IDs válidos (puedes ajustar estos IDs según tu BD)
            const habitId = '688dfcd651859ebc37fb24fd'
            const date = new Date().toISOString()
            const status = 'done'
            
            return addProgress('688dfcd551859ebc37fb24f3', habitId, date, status)
                .then(result => {
                    console.log('✅ Resultado de agregar progreso:', result)
                })
                .catch(error => {
                    console.error('❌ Error al agregar progreso:', error.message)
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