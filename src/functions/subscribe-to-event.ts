import { eq } from 'drizzle-orm';
import { db } from '../drizzle/client';
import { subscription } from '../drizzle/schema/subscription';

type subscribdeToEventProps = {
  name: string;
  email: string;
};
export async function subscribdeToEvent({
  email,
  name,
}: subscribdeToEventProps) {
  const subs = await db
    .select()
    .from(subscription)
    .where(eq(subscription.email, email));
  if (subs.length) {
    return { subscribdeId: subs[0].id };
  }
  const subscriptions = await db
    .insert(subscription)
    .values({ name, email })
    .returning();
  return { subscribdeId: subscriptions[0].id };
}
