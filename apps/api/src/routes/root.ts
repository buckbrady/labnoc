import { FastifyInstance } from 'fastify'

export = async (fastify: FastifyInstance, opts: any) => {
  fastify.get('/', async (request, reply) => {
    return { root: true }
  })
}
