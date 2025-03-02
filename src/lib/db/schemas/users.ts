import { relations, type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { index, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { passwords } from './passwords';
import { sessions } from './sessions';

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
	sessions: many(sessions)
}));

export type User = InferSelectModel<typeof users>;
export type UserInsert = InferInsertModel<typeof users>;
