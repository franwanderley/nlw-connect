import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const subscribdeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/hello',
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
      },
    },
    (request, reply) => {
      const { name, email } = request.body
      reply.status(201).send({ name, email })
    }
  )
}
