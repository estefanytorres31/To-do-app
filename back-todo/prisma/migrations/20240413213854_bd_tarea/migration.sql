/*
  Warnings:

  - You are about to drop the `tarea` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `tarea`;

-- CreateTable
CREATE TABLE `task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(255) NOT NULL,
    `descripcion` VARCHAR(255) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL,
    `fecha_limite` DATETIME(3) NOT NULL,
    `estado` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
