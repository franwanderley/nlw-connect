import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { acessToInviteLink } from '../functions/acess-invite-link';

export const acessInviteLink: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invite/:subscriberId',
    {
      schema: {
        params: z.object({
          subscriberId: z.string(),
        }),
      },
    },
    async (request, _) => {
      const { subscriberId } = request.params;
      await acessToInviteLink({ subscriberId });
    }
  );
};
