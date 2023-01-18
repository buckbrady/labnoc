import Fastify, { FastifyInstance } from 'fastify'
import fastifyCircuitBreaker from '@fastify/circuit-breaker'
import noFaviconPlugin from './plugins/favicon'
import fastifyFormbody from '@fastify/formbody'
import fastifyHelmet from '@fastify/helmet'
// import fastifyRateLimit from '@fastify/rate-limit'
import fastifySensible from '@fastify/sensible'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastifyAutoload from '@fastify/autoload'
import fastifyCors from '@fastify/cors'
import { plugin as supertokensPlugin, errorHandler } from 'supertokens-node/framework/fastify'
import './supertokens'
import path from 'node:path'
import supertokens from 'supertokens-node'
const app: FastifyInstance = Fastify({
  logger: true
})
app.setErrorHandler(errorHandler())

// https://github.com/fastify/fastify-sensible
app.register(fastifySensible)
// https://github.com/fastify/fastify-circuit-breaker
app.register(fastifyCircuitBreaker)
// https://github.com/fastify/fastify-formbody
app.register(fastifyFormbody)
// https://github.com/fastify/fastify-helmet
app.register(fastifyHelmet, {
  contentSecurityPolicy: false
})
// https://github.com/fastify/fastify-rate-limit
// app.register(fastifyRateLimit, {
//   global: Boolean(process.env.LABNOC_API_RATE_LIMIT_GLOBAL) ?? false
// })
// ./plugins/favicon.ts
app.register(noFaviconPlugin)
app.register(fastifyCors, {
  origin: '*',
  allowedHeaders: ['Content-Type', ...supertokens.getAllCORSHeaders()],
  credentials: true
})
app.register(supertokensPlugin)
// https://github.com/fastify/fastify-swagger
app.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'LabNoc API',
      description: 'LabNoc API Documentation',
      version: 'latest'
    }
  }
})
// https://github.com/fastify/fastify-swagger-ui
app.register(fastifySwaggerUi, {
  routePrefix: '/_swagger',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  transformSpecificationClone: true
})

app.register(fastifyAutoload, {
  dir: path.join(__dirname, 'routes'),
  routeParams: true
})
const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
