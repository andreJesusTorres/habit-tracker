import 'dotenv/config'
import db from 'dat'
import express from 'express'
import cors from 'cors'
import { usersRouter, habitsRouter, goalsRouter, progressRouter, eventsRouter } from './routes/index.js';


import { errorHandler } from './routes/helpers/index.js'

db.connect(process.env.MONGO_URL).then(() => {
    console.log('connected to MONGODB')

    const server = express()

    server.use(cors())
    server.use(express.json())

    server.get('/', (_, res) => res.send('Hello, API!'))

    server.use('/users', usersRouter)
    server.use('/habits', habitsRouter)
    server.use('/goals', goalsRouter)
    server.use('/progress', progressRouter)
    server.use('/events', eventsRouter)

    server.use(errorHandler)

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
})