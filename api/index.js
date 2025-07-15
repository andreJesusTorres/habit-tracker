import db from 'dat';
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { usersRouter, habitsRouter, goalsRouter, progressRouter, eventsRouter } from './routes/index.js';


import { errorHandler } from './routes/helpers/index.js'

db.connect(process.env.MONGO_URL).then(() => {
    console.log('Conectado a MongoDB')

    const server = express()

    server.use(cors())
    server.use(express.json())

    server.get('/', (_, res) => res.send('¡Hola, API!'))

    server.use('/users', usersRouter)
    server.use('/habits', habitsRouter)
    server.use('/goals', goalsRouter)
    server.use('/progress', progressRouter)
    server.use('/events', eventsRouter)

    server.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`API escuchando en puerto ${process.env.PORT}`))
})