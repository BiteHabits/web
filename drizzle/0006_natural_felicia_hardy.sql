CREATE TABLE `fridge_user` (
	`user_id` text NOT NULL,
	`fridge_id` text NOT NULL,
	PRIMARY KEY(`user_id`, `fridge_id`),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`fridge_id`) REFERENCES `fridge`(`fridge_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `unique_user_fridge_name` ON `fridge` (`user_id`,`name`);