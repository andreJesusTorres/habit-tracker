import 'dotenv/config'
import db from 'dat'
import deleteGoal from './deleteGoal.js'

console.log('🧪 Testing de deleteGoal...')

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            console.log('📝 Probando eliminar meta...')
            // Usar IDs válidos (puedes ajustar estos IDs según tu BD)
            return deleteGoal('688dfcd551859ebc37fb24f3', '688dfcd651859ebc37fb24fd')
                .then(result => {
                    console.log('✅ Resultado de eliminar meta:', result)
                })
                .catch(error => {
                    console.error('❌ Error al eliminar meta:', error.message)
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