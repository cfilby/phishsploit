CREATE TABLE IF NOT EXISTS `phish_path_part` (
    `phish_id` INTEGER NOT NULL,
    `path_part` TEXT NOT NULL,
    FOREIGN KEY (`phish_id`) REFERENCES `phish`(`phish_id`)
);
