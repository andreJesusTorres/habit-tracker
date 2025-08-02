import 'dotenv/config'
import db from 'dat'
import addGoal from './addGoal.js'

console.log('🧪 Testing de addGoal...')

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            console.log('📝 Probando agregar meta...')
            // Usar IDs válidos (puedes ajustar estos IDs según tu BD)
            const habitId = '688dfcd651859ebc37fb24fd'
            const goalData = {
                name: 'Meta de Testing',
                period: 'monthly',
                objective: 30,
                targetDays: 30
            }
            
            return addGoal('688dfcd551859ebc37fb24f3', habitId, goalData)
                .then(result => {
                    console.log('✅ Resultado de agregar meta:', result)
                })
                .catch(error => {
                    console.error('❌ Error al agregar meta:', error.message)
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