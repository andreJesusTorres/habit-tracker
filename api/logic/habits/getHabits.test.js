import 'dotenv/config'
import db from 'dat'
import getHabits from './getHabits.js'

console.log('🧪 Testing de getHabits...')

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            console.log('📝 Probando obtener hábitos...')
            // Usar un userId válido (puedes ajustar este ID según tu BD)
            return getHabits('688dfcd551859ebc37fb24f3')
                .then(result => {
                    console.log('✅ Resultado de obtener hábitos:', result)
                })
                .catch(error => {
                    console.error('❌ Error al obtener hábitos:', error.message)
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