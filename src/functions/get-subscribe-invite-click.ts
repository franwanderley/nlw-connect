import { env } from '../env';
import { redis } from '../redis/client';

type getSubscribeInviteClickProps = {
  subscriberId: string;
};
export async function getSubscribeInviteClick({
  subscriberId,
}: getSubscribeInviteClickProps) {
  const count = await redis.zscore(env.REDIS_HASH, subscriberId);
  return { count: count ? Number(count) : 0 };
}
