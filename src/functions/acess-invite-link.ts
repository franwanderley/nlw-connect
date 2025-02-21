import { env } from '../env';
import { redis } from '../redis/client';

type acessToInviteLinkProps = {
  subscriberId: string;
};
export async function acessToInviteLink({
  subscriberId,
}: acessToInviteLinkProps) {
  await redis.zincrby(env.REDIS_HASH, 1, subscriberId);
}
