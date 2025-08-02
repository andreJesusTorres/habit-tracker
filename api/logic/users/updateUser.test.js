import 'dotenv/config'
import db from 'dat'
import updateUser from './updateUser.js'

console.log('🧪 Testing de updateUser...')

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            console.log('📝 Probando actualización de usuario...')
            // Usar un userId válido (puedes ajustar este ID según tu BD)
            return updateUser('688dfcd551859ebc37fb24f3', {
                name: 'Usuario Actualizado',
                email: 'actualizado@example.com'
            })
                .then(result => {
                    console.log('✅ Resultado de actualización:', result)
                })
                .catch(error => {
                    console.error('❌ Error en actualización:', error.message)
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