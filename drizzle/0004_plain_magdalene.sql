CREATE TABLE `fridge` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`expiry_date` text NOT NULL,
	`quantity` integer NOT NULL,
	`fridge_id` text NOT NULL,
	FOREIGN KEY (`fridge_id`) REFERENCES `fridge`(`id`) ON UPDATE no action ON DELETE no action
);
