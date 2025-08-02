import 'dotenv/config'
import db from 'dat'
import registerUser from './registerUser.js'

console.log('🧪 Testing de registerUser...')

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            console.log('📝 Probando registro de usuario...')
            return registerUser('Usuario Test', 'test@example.com', 'testuser', '12345678', '12345678')
                .then(result => {
                    console.log('✅ Resultado de registro:', result)
                })
                .catch(error => {
                    console.error('❌ Error en registro:', error.message)
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