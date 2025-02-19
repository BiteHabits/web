import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { nanoid } from 'nanoid';
import { relations } from 'drizzle-orm';

export const passwords = sqliteTable('password', {
	id: text().primaryKey().$defaultFn(nanoid),
	userId: text()
		.notNull()
		.references(() => users.id, {
			onDelete: 'cascade'
		}),
	hash: text().notNull()
});

export const passwordsRelations = relations(passwords, ({ one }) => ({
	user: one(users, {
		fields: [passwords.userId],
		references: [users.id]
	})
}));
