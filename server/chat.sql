-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema chat
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `chat` ;

-- -----------------------------------------------------
-- Schema chat
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `chat` DEFAULT CHARACTER SET utf8 ;
USE `chat` ;

-- -----------------------------------------------------
-- Table `chat`.`rooms`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `chat`.`rooms` ;

CREATE TABLE IF NOT EXISTS `chat`.`rooms` (
  `idRoom` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `roomname` TEXT NOT NULL,
  PRIMARY KEY (`idRoom`),
  UNIQUE INDEX `idRoom_UNIQUE` (`idRoom` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `chat`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `chat`.`users` ;

CREATE TABLE IF NOT EXISTS `chat`.`users` (
  `idUser` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` TEXT NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `iduser_UNIQUE` (`idUser` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `chat`.`messages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `chat`.`messages` ;

CREATE TABLE IF NOT EXISTS `chat`.`messages` (
  `idMessage` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `text` TEXT NOT NULL,
  `time` DATETIME NULL DEFAULT NULL,
  `idUser` INT(10) UNSIGNED NOT NULL,
  `idRoom` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`idMessage`),
  UNIQUE INDEX `idMessage_UNIQUE` (`idMessage` ASC),
  INDEX `idUser_idx` (`idUser` ASC),
  INDEX `idRoom_idx` (`idRoom` ASC),
  CONSTRAINT `idRoom`
    FOREIGN KEY (`idRoom`)
    REFERENCES `chat`.`rooms` (`idRoom`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idUser`
    FOREIGN KEY (`idUser`)
    REFERENCES `chat`.`users` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `chat`.`friend-list`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `chat`.`friend-list` ;

CREATE TABLE IF NOT EXISTS `chat`.`friend-list` (
  `idUserFrom` INT(10) UNSIGNED NOT NULL,
  `idUserTo` INT(10) UNSIGNED NOT NULL)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
