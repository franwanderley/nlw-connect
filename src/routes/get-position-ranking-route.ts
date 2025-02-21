import { eq } from 'drizzle-orm';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { db } from '../drizzle/client';
import { subscription } from '../drizzle/schema/subscription';
import { env } from '../env';
import { redis } from '../redis/client';

export const getPositionRanking: FastifyPluginAsyncZod = async app => {
  app.get(
    '/subscribe-position/:subscriberId',
    {
      schema: {
        params: z.object({
          subscriberId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params;
      const position = await redis.zrevrank(env.REDIS_HASH, subscriberId);
      const result = await redis.zrange(env.REDIS_HASH, 0, 4);
      console.log(result);
      if (position === null) {
        return reply.status(200).send({ position });
      }
      return reply.status(200).send({ position: position + 1 });
    }
  );

  app.get('/ranking-invite', async () => {
    const ranking = await redis.zrevrange(env.REDIS_HASH, 0, 5, 'WITHSCORES');
    const subscribeScore: Record<string, number> = {};
    for (let i = 0; i < ranking.length; i += 2) {
      const subscriptions = await db
        .select({ name: subscription?.name })
        .from(subscription)
        .where(eq(subscription.id, ranking[i]));
      subscribeScore[subscriptions[0].name] = Number(ranking[i + 1]);
    }
    return { ranking: subscribeScore };
  });
};
