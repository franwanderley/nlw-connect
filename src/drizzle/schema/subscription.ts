import { timestamp } from 'drizzle-orm/pg-core'
import { pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const subscription = pgTable('subscription', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
