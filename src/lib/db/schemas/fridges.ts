import { InferSelectModel, relations } from "drizzle-orm";
import { sqliteTable, text, integer} from "drizzle-orm/sqlite-core";
import { userFridges } from "./user_fridge";

export const fridges = sqliteTable(
    'fridge',
    {
        fridge_id: integer().primaryKey({autoIncrement: true}),
        name: text("name").notNull(),
    }
)

export const fridgesRElations = relations(fridges, ({ many }) => ({
    userFridges: many(userFridges),
}));

export type Fridge = InferSelectModel<typeof fridges>;
