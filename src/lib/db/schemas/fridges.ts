import { relations, type InferSelectModel } from 'drizzle-orm';
import { sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { users } from './users';

export const fridges = sqliteTable(
	'fridge',
	{
		id: text().primaryKey().$defaultFn(nanoid),
		name: text('name').notNull(),
		userId: text('user_id')
			.notNull()
			.references(() => users.id)
	},
	(table) => ({
		uniqueUserFridgeName: uniqueIndex('unique_user_fridge_name').on(table.userId, table.name)
	})
);

// export const fridgesRelations = relations(fridges, ({ many }) => ({
//     //will add relation to user-fridge
//     //will add relation to products
// }));

export const fridgesRelations = relations(fridges, ({ one }) => ({
	user: one(users, {
		fields: [fridges.userId],
		references: [users.id]
	})
}));

export type Fridge = InferSelectModel<typeof fridges>;
