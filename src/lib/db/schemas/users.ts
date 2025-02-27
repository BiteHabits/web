import { relations, type InferSelectModel } from 'drizzle-orm';
import { index, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { passwords } from './passwords';
import { sessions } from './sessions';
import { userFridges } from './user_fridge';

export const users = sqliteTable(
	'user',
	{
		id: text().primaryKey().$defaultFn(nanoid),
		name: text().notNull(),
		email: text().notNull().unique()
	},
	(t) => [index('email_idx').on(t.email)]
);

export const usersRelations = relations(users, ({ one, many }) => ({
	password: one(passwords, {
		fields: [users.id],
		references: [passwords.userId]
	}),
    userFridges: many(userFridges),
	sessions: many(sessions)
}));

export type User = InferSelectModel<typeof users>;
