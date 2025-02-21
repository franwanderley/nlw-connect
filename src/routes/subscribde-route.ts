import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { subscribdeToEvent } from '../functions/subscribe-to-event';

export const subscribdeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscribe',
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
      },
    },
    async (request, reply) => {
      const { name, email } = request.body;
      const { subscribdeId } = await subscribdeToEvent({ name, email });
      reply.status(201).send({ subscribdeId });
    }
  );
};
