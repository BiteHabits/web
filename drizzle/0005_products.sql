CREATE TABLE `product` (
    `product_id` TEXT PRIMARY KEY NOT NULL,
    `name` TEXT NOT NULL,
    `expiry_date` TEXT NOT NULL,
    `quantity` INTEGER NOT NULL,
    `fridge_id` TEXT NOT NULL,
    FOREIGN KEY (`fridge_id`) REFERENCES `fridge`(`fridge_id`) ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE UNIQUE INDEX `product_id_unique` ON `product` (`product_id`);