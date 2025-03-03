import { relations, type InferSelectModel } from 'drizzle-orm';
import { sqliteTable, text, primaryKey } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { fridges } from './fridges'

export const fridgeUsers = sqliteTable(
    'fridge_user',
    {
        userId: text().notNull().references(() => users.id, { onDelete: 'cascade' }),
        fridgeId: text().notNull().references(() => fridges.id, { onDelete: 'cascade' }),
    },
    (t) => [
        primaryKey({ columns: [t.userId, t.fridgeId]})
    ]
);

export const fridgeUsersRelations = relations(fridgeUsers, ({ one }) => ({
    user: one(users, {
        fields: [fridgeUsers.userId],
        references: [users.id]
    }),
    fridge: one(fridges, {
        fields: [fridgeUsers.fridgeId],
        references: [fridges.fridge_id]
    })
}));

export type fridgeUsers = InferSelectModel<typeof fridgeUsers>;
