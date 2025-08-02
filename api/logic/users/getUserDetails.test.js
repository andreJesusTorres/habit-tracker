import 'dotenv/config'
import db from 'dat'
import getUserDetails from './getUserDetails.js'

console.log('🧪 Testing de getUserDetails...')

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            console.log('📝 Probando obtener detalles de usuario...')
            // Usar un userId válido (puedes ajustar este ID según tu BD)
            return getUserDetails('688dfcd551859ebc37fb24f3')
                .then(result => {
                    console.log('✅ Resultado de obtener detalles:', result)
                })
                .catch(error => {
                    console.error('❌ Error al obtener detalles:', error.message)
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