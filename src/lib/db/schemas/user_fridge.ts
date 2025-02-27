import { integer, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { fridges } from "./fridges";
import { relations } from "drizzle-orm/relations";
import { InferSelectModel } from "drizzle-orm";

export const userFridges = sqliteTable(
    'user_fridges',
    {
        userId: text()
        .references(() => users.id,{
            onDelete: 'cascade'
        }),
        fridgeId: integer()
        .references(() => fridges.fridge_id,{
            onDelete: 'cascade'
        }
        )
    },
    (table) => ({
        pk: primaryKey(table.userId, table.fridgeId),
    })
)

export const userFridgeRelations = relations(userFridges, ({ one }) => ({
    user: one(users, {
        fields: [userFridges.userId],
        references: [users.id],
    }),
    fridge: one(fridges, {
        fields: [userFridges.fridgeId],
        references: [fridges.fridge_id],
    }),
}));

export type UserFridge = InferSelectModel<typeof userFridges>
