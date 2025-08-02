import 'dotenv/config'
import db from 'dat'
import getGoals from './getGoals.js'

console.log('🧪 Testing de getGoals...')

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            console.log('📝 Probando obtener metas...')
            // Usar un userId válido (puedes ajustar este ID según tu BD)
            return getGoals('688dfcd551859ebc37fb24f3')
                .then(result => {
                    console.log('✅ Resultado de obtener metas:', result)
                })
                .catch(error => {
                    console.error('❌ Error al obtener metas:', error.message)
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