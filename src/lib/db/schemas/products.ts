import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { fridges } from './fridges';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';

export const products = sqliteTable('product', {
	id: text().primaryKey().$defaultFn(nanoid),
	name: text('name').notNull(),
	expiresAt: integer({ mode: 'timestamp' }).notNull(),
	quantity: integer('quantity').notNull(),
	fridgeId: text('fridge_id')
		.notNull()
		.references(() => fridges.id)
});

export type Product = InferSelectModel<typeof products>;
export type ProductInsert = InferInsertModel<typeof products>;
