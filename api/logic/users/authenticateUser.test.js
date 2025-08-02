import 'dotenv/config'
import db from 'dat'
import authenticateUser from './authenticateUser.js'

console.log('🧪 Testing de authenticateUser...')

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            console.log('📝 Probando autenticación de usuario...')
            return authenticateUser('testuser', '12345678')
                .then(result => {
                    console.log('✅ Resultado de autenticación:', result)
                })
                .catch(error => {
                    console.error('❌ Error en autenticación:', error.message)
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