import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { getSubscribeInviteClick } from '../functions/get-subscribe-invite-click';
export const getSubscribdeInviteClick: FastifyPluginAsyncZod = async app => {
  app.get(
    '/subscribde-invite-click/:subscriberId',
    {
      schema: {
        params: z.object({
          subscriberId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params;
      const { count } = await getSubscribeInviteClick({ subscriberId });
      return reply.status(200).send(count);
    }
  );
};
