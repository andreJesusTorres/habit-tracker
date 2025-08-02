import 'dotenv/config'
import db from 'dat'
import getProgress from './getProgress.js'

console.log('🧪 Testing de getProgress...')

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            console.log('📝 Probando obtener progreso...')
            // Usar un userId válido (puedes ajustar este ID según tu BD)
            return getProgress('688dfcd551859ebc37fb24f3')
                .then(result => {
                    console.log('✅ Resultado de obtener progreso:', result)
                })
                .catch(error => {
                    console.error('❌ Error al obtener progreso:', error.message)
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