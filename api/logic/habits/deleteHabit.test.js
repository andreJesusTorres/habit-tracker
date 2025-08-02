import 'dotenv/config'
import db from 'dat'
import deleteHabit from './deleteHabit.js'

console.log('🧪 Testing de deleteHabit...')

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            console.log('📝 Probando eliminar hábito...')
            // Usar un habitId válido (puedes ajustar este ID según tu BD)
            return deleteHabit('688dfcd551859ebc37fb24f3', '688dfcd651859ebc37fb24fd')
                .then(result => {
                    console.log('✅ Resultado de eliminar hábito:', result)
                })
                .catch(error => {
                    console.error('❌ Error al eliminar hábito:', error.message)
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