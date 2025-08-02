import 'dotenv/config'
import db from 'dat'
import deleteProgress from './deleteProgress.js'

console.log('🧪 Testing de deleteProgress...')

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            console.log('📝 Probando eliminar progreso...')
            // Usar IDs válidos (puedes ajustar estos IDs según tu BD)
            const progressId = '688dfcd651859ebc37fb24fd'
            const habitId = '688dfcd651859ebc37fb24fd'
            
            return deleteProgress(progressId, habitId)
                .then(result => {
                    console.log('✅ Resultado de eliminar progreso:', result)
                })
                .catch(error => {
                    console.error('❌ Error al eliminar progreso:', error.message)
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