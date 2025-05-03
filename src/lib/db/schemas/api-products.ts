import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const apiProducts = sqliteTable('api_product', {
	ean: text('ean').primaryKey(),
	name: text('name').notNull(),
	brand: text('brand')
});

export type ApiProduct = InferSelectModel<typeof apiProducts>;
export type ApiProductInsert = InferInsertModel<typeof apiProducts>;
