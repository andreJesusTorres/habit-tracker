import 'dotenv/config'
import db from 'dat'
import addHabit from './addHabit.js'

console.log('🧪 Testing de addHabit...')

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            console.log('📝 Probando agregar hábito...')
            // Usar un userId válido (puedes ajustar este ID según tu BD)
            return addHabit('688dfcd551859ebc37fb24f3', 'Hábito de Testing', 'actividad física', 'cardio', '💪')
                .then(result => {
                    console.log('✅ Resultado de agregar hábito:', result)
                })
                .catch(error => {
                    console.error('❌ Error al agregar hábito:', error.message)
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