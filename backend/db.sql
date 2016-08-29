USE opentheater;

CREATE TABLE `User` (
	`id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Room` (
	`id` INT NOT NULL,
	`torren_magnet_link` varchar(255),
	`joignable_after_start` BOOLEAN,
	`name` varchar,
	`admin` INT,
	`private` BOOLEAN,
	`max_spectators` INT DEFAULT '100',
	`description` varchar,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Tag` (
	`id` INT NOT NULL,
	`name` varchar NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `RoomTag_Assoc` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`tag` INT NOT NULL,
	`room` INT NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Room` ADD CONSTRAINT `Room_fk0` FOREIGN KEY (`admin`) REFERENCES `User`(`id`);

ALTER TABLE `RoomTag_Assoc` ADD CONSTRAINT `RoomTag_Assoc_fk0` FOREIGN KEY (`tag`) REFERENCES `Tag`(`id`);

ALTER TABLE `RoomTag_Assoc` ADD CONSTRAINT `RoomTag_Assoc_fk1` FOREIGN KEY (`room`) REFERENCES `Room`(`id`);
