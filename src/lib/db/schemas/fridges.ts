import { InferSelectModel} from "drizzle-orm";
import { sqliteTable, text} from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const fridges = sqliteTable(
    'fridge',
    {
        fridge_id: text().primaryKey().$defaultFn(nanoid),
        name: text("name").notNull(),
    }
)

// export const fridgesRElations = relations(fridges, ({ many }) => ({
//     //will add relation to user-fridge
//     //will add relation to products
// }));

export type Fridge = InferSelectModel<typeof fridges>;
