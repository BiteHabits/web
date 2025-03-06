import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { fridges } from './fridges';
import type { InferSelectModel } from 'drizzle-orm';

export const products = sqliteTable('product', {
	productId: text().primaryKey().$defaultFn(nanoid),
	name: text('name').notNull(),
	expiresAt: text('expiry_date').notNull(),
	quantity: integer('quantity').notNull(),
	fridgeId: text('fridge_id')
		.notNull()
		.references(() => fridges.fridgeId)
});

export type Product = InferSelectModel<typeof products>;
