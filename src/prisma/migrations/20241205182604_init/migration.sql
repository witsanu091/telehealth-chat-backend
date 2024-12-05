-- CreateTable
CREATE TABLE `Chat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room` VARCHAR(191) NOT NULL,
    `sender` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `event` VARCHAR(191) NOT NULL,
    `created_on` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `room_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `created_on` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Member` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `socket_id` VARCHAR(191) NOT NULL,
    `room_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Member` ADD CONSTRAINT `Member_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
