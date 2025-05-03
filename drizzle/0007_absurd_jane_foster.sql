CREATE TABLE `api_product` (
	`ean` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`brand` text
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_product` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`expiry_date` integer NOT NULL,
	`quantity` integer NOT NULL,
	`fridge_id` text NOT NULL,
	FOREIGN KEY (`fridge_id`) REFERENCES `fridge`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_product`("id", "name", "expiry_date", "quantity", "fridge_id") SELECT "id", "name", "expiry_date", "quantity", "fridge_id" FROM `product`;--> statement-breakpoint
DROP TABLE `product`;--> statement-breakpoint
ALTER TABLE `__new_product` RENAME TO `product`;--> statement-breakpoint
PRAGMA foreign_keys=ON;