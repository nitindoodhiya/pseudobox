
CREATE DATABASE pseudobox;

USE pseudobox;

DROP TABLE IF EXISTS `files`;

CREATE TABLE `files` (
	`file_name` VARCHAR(50),
	`original_file_name` VARCHAR(50),
	`created_at` DATE NOT NULL,
	`size` INT NOT NULL,
	`mimetype` VARCHAR(20) NOT NULL,
	`metadata` VARCHAR(100) NOT NULL,
	`id` INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`id`)
);