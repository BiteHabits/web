import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";
import { fridges } from './fridges';
import type { InferSelectModel } from "drizzle-orm";

export const products = sqliteTable(
    'product',
    {
        product_id: text().primaryKey().$defaultFn(nanoid),
        name: text("name").notNull(),
        expiry_date: text("expiry_date").notNull(),
        quantity: integer("quantity").notNull(),
        fridge_id: text("fridge_id").notNull().references(() => fridges.fridge_id),
    }
);

export type Product = InferSelectModel<typeof products>;