import 'dotenv/config'
import db from 'dat'
import getEvents from './getEvents.js'

console.log('🧪 Testing de getEvents...')

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            console.log('📝 Probando obtener eventos...')
            // Usar un userId válido (puedes ajustar este ID según tu BD)
            return getEvents('688dfcd551859ebc37fb24f3')
                .then(result => {
                    console.log('✅ Resultado de obtener eventos:', result)
                })
                .catch(error => {
                    console.error('❌ Error al obtener eventos:', error.message)
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