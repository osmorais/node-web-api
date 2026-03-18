// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     response.write('teste 1')

//     return response.end()
// })

// server.listen(3333)

// //localhost:3333

import { fastify } from 'fastify'
// import { DatabaseMemory }from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'
import fastifyStatic from '@fastify/static'
import path from 'path'

const server = fastify()
const database = new DatabasePostgres()


server.register(fastifyStatic, {
    root: path.join(process.cwd(), 'public'),
})

server.post('/videos', async (request, reply) => {
    const { title, description, duration} = request.body

    await database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})


server.get('/videos', async (request, reply) => {
    const search = request.query.search
    const videos = await database.list(search)

    return videos
})


server.put('/videos/:id', async (request, reply) => {
    const videosID = request.params.id
    const { title, description, duration} = request.body

    await database.update(videosID, {
        title,
        description,
        duration,
    })

    return reply.status(204).send();
})

server.delete('/videos/:id', async (request, reply) => {
    const videosID = request.params.id

    await database.delete(videosID)

    return reply.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})

