import { relations, type InferSelectModel } from 'drizzle-orm';
import { sqliteTable, text, primaryKey } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { fridges } from './fridges';

export const fridgeUsers = sqliteTable(
	'fridge_user',
	{
		user_id: text()
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		fridge_id: text()
			.notNull()
			.references(() => fridges.id, { onDelete: 'cascade' })
	},
	(t) => [primaryKey({ columns: [t.user_id, t.fridge_id] })]
);

export const fridgeUsersRelations = relations(fridgeUsers, ({ one }) => ({
	user: one(users, {
		fields: [fridgeUsers.user_id],
		references: [users.id]
	}),
	fridge: one(fridges, {
		fields: [fridgeUsers.fridge_id],
		references: [fridges.id]
	})
}));

export type fridgeUsers = InferSelectModel<typeof fridgeUsers>;
