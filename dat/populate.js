import 'dotenv/config'
import bcrypt from 'bcryptjs'
import db, { User, Habit } from './index.js'

db.connect(process.env.MONGO_URL)
    .then(() => {
        return Promise.all([User.deleteMany(), Habit.deleteMany])
    })
    .then(() => {
        const usersData = [
            { name: 'Abel', email: 'abel@example.com', username: 'abelmarquez', password: bcrypt.hashSync('password123', 10), role: 'regular' },
            { name: 'Admin', email: 'admin@example.com', username: 'adminuser', password: bcrypt.hashSync('adminpass', 10), role: 'admin' }
        ]

        return User.insertMany(usersData)
    })
    .then(users => {
        const habitsData = [
            { name: 'Ejercicio diario', emoji: '🏋️', user: users[0]._id, category: 'actividad física' },
            { name: 'Leer un libro', emoji: '📚', user: users[0]._id, category: 'desarrollo personal' },
            { name: 'Controlar gastos', emoji: '💰', user: users[1]._id, category: 'finanzas' }
        ]

        return Habit.insertMany(habitsData)
    })
    .then(habits => {
        console.log('Database populated successfully')
    })
    .catch(error => {
        console.error('Error populating database:', error.message)
    })
    .finally(() => {
        db.disconnect()
    })