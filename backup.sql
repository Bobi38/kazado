-- MySQL dump 10.13  Distrib 8.4.11, for Linux (x86_64)
--
-- Host: localhost    Database: Cal
-- ------------------------------------------------------
-- Server version	8.4.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `core_calendar`
--

DROP TABLE IF EXISTS `core_calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_calendar` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nb_home` int NOT NULL,
  `validator` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_calendar`
--

LOCK TABLES `core_calendar` WRITE;
/*!40000 ALTER TABLE `core_calendar` DISABLE KEYS */;
INSERT INTO `core_calendar` VALUES ('cmt8o0y0v0000o417fob5mzri','Cal_Valid_NoToDo',1,1);
/*!40000 ALTER TABLE `core_calendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_calendar_admin`
--

DROP TABLE IF EXISTS `core_calendar_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_calendar_admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `calendarId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idadm` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `core_calendar_admin_calendarId_fkey` (`calendarId`),
  KEY `core_calendar_admin_idadm_fkey` (`idadm`),
  CONSTRAINT `core_calendar_admin_calendarId_fkey` FOREIGN KEY (`calendarId`) REFERENCES `core_calendar` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `core_calendar_admin_idadm_fkey` FOREIGN KEY (`idadm`) REFERENCES `core_user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_calendar_admin`
--

LOCK TABLES `core_calendar_admin` WRITE;
/*!40000 ALTER TABLE `core_calendar_admin` DISABLE KEYS */;
INSERT INTO `core_calendar_admin` VALUES (1,'cmt8o0y0v0000o417fob5mzri',1);
/*!40000 ALTER TABLE `core_calendar_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_calendar_user`
--

DROP TABLE IF EXISTS `core_calendar_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_calendar_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` tinyint(1) NOT NULL,
  `calendarId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `core_calendar_user_calendarId_fkey` (`calendarId`),
  KEY `core_calendar_user_userId_fkey` (`userId`),
  CONSTRAINT `core_calendar_user_calendarId_fkey` FOREIGN KEY (`calendarId`) REFERENCES `core_calendar` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `core_calendar_user_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `core_user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_calendar_user`
--

LOCK TABLES `core_calendar_user` WRITE;
/*!40000 ALTER TABLE `core_calendar_user` DISABLE KEYS */;
INSERT INTO `core_calendar_user` VALUES (1,1,'cmt8o0y0v0000o417fob5mzri',1);
/*!40000 ALTER TABLE `core_calendar_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_home`
--

DROP TABLE IF EXISTS `core_home`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_home` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nb_people` int NOT NULL,
  `nb_bedroom` int NOT NULL,
  `adress` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isToDo` tinyint(1) NOT NULL DEFAULT '0',
  `calendarId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `core_home_calendarId_fkey` (`calendarId`),
  CONSTRAINT `core_home_calendarId_fkey` FOREIGN KEY (`calendarId`) REFERENCES `core_calendar` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_home`
--

LOCK TABLES `core_home` WRITE;
/*!40000 ALTER TABLE `core_home` DISABLE KEYS */;
INSERT INTO `core_home` VALUES (1,2,3,'','home',0,'cmt8o0y0v0000o417fob5mzri');
/*!40000 ALTER TABLE `core_home` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_notification`
--

DROP TABLE IF EXISTS `core_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `calendarId` int NOT NULL,
  `affichage` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `variables` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `core_notification_affichage_fkey` (`affichage`),
  CONSTRAINT `core_notification_affichage_fkey` FOREIGN KEY (`affichage`) REFERENCES `core_notification_template` (`key`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_notification`
--

LOCK TABLES `core_notification` WRITE;
/*!40000 ALTER TABLE `core_notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `core_notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_notification_template`
--

DROP TABLE IF EXISTS `core_notification_template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_notification_template` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `core_notification_template_key_key` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_notification_template`
--

LOCK TABLES `core_notification_template` WRITE;
/*!40000 ALTER TABLE `core_notification_template` DISABLE KEYS */;
INSERT INTO `core_notification_template` VALUES (1,'NEW_RESERVATION_PENDING','📌 Nouvelle demande de réservation sur {calendarName} !','{guestName} a soumis une demande pour le créneau du {date}.'),(2,'NEW_RESERVATION_WAITING','📌 Nouvelle demande en attente de validation sur {calendarName} !','{guestName} a soumis une demande pour le créneau du {date}.\nEn attente de validation dans l\'onglet \"Réservation\", rubrique \"réservations en attentes de validations\"'),(3,'MY_RESA_VALIDATED','✅ Réservation confirmée sur {calendarName}!','Votre réservation pour le calendrier {calendarName} a été validée par un validator.'),(4,'RESA_VALIDATED','✅ Réservation confirmée sur {calendarName}!','La réservation de {guestName} pour le calendrier {calendarName} du {date} a été validée par un validator.'),(5,'RESA_REFUSED','❌ Réservation refusée','Votre demande de réservation a été refusée. Motif : {reason}');
/*!40000 ALTER TABLE `core_notification_template` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_notification_user_receive`
--

DROP TABLE IF EXISTS `core_notification_user_receive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_notification_user_receive` (
  `id` int NOT NULL AUTO_INCREMENT,
  `notifId` int NOT NULL,
  `userId` int NOT NULL,
  `isRead` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `core_notification_user_receive_notifId_fkey` (`notifId`),
  KEY `core_notification_user_receive_userId_fkey` (`userId`),
  CONSTRAINT `core_notification_user_receive_notifId_fkey` FOREIGN KEY (`notifId`) REFERENCES `core_notification` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `core_notification_user_receive_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `core_user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_notification_user_receive`
--

LOCK TABLES `core_notification_user_receive` WRITE;
/*!40000 ALTER TABLE `core_notification_user_receive` DISABLE KEYS */;
/*!40000 ALTER TABLE `core_notification_user_receive` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_relation_CalendarHome`
--

DROP TABLE IF EXISTS `core_relation_CalendarHome`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_relation_CalendarHome` (
  `id` int NOT NULL AUTO_INCREMENT,
  `calendarId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `homeId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `core_relation_CalendarHome_calendarId_fkey` (`calendarId`),
  KEY `core_relation_CalendarHome_homeId_fkey` (`homeId`),
  CONSTRAINT `core_relation_CalendarHome_calendarId_fkey` FOREIGN KEY (`calendarId`) REFERENCES `core_calendar` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `core_relation_CalendarHome_homeId_fkey` FOREIGN KEY (`homeId`) REFERENCES `core_home` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_relation_CalendarHome`
--

LOCK TABLES `core_relation_CalendarHome` WRITE;
/*!40000 ALTER TABLE `core_relation_CalendarHome` DISABLE KEYS */;
INSERT INTO `core_relation_CalendarHome` VALUES (1,'cmt8o0y0v0000o417fob5mzri',1);
/*!40000 ALTER TABLE `core_relation_CalendarHome` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_reservation`
--

DROP TABLE IF EXISTS `core_reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_reservation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_start` datetime(3) NOT NULL,
  `date_end` datetime(3) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `nb_adult` int NOT NULL DEFAULT '1',
  `nb_children` int NOT NULL DEFAULT '0',
  `nb_bedroom` int NOT NULL DEFAULT '1',
  `note` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` int NOT NULL,
  `calendarId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `core_reservation_userId_fkey` (`userId`),
  KEY `core_reservation_calendarId_fkey` (`calendarId`),
  CONSTRAINT `core_reservation_calendarId_fkey` FOREIGN KEY (`calendarId`) REFERENCES `core_calendar` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `core_reservation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `core_user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_reservation`
--

LOCK TABLES `core_reservation` WRITE;
/*!40000 ALTER TABLE `core_reservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `core_reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_reservation_home`
--

DROP TABLE IF EXISTS `core_reservation_home`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_reservation_home` (
  `id` int NOT NULL AUTO_INCREMENT,
  `resaId` int NOT NULL,
  `homeId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `core_reservation_home_resaId_fkey` (`resaId`),
  KEY `core_reservation_home_homeId_fkey` (`homeId`),
  CONSTRAINT `core_reservation_home_homeId_fkey` FOREIGN KEY (`homeId`) REFERENCES `core_home` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `core_reservation_home_resaId_fkey` FOREIGN KEY (`resaId`) REFERENCES `core_reservation` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_reservation_home`
--

LOCK TABLES `core_reservation_home` WRITE;
/*!40000 ALTER TABLE `core_reservation_home` DISABLE KEYS */;
/*!40000 ALTER TABLE `core_reservation_home` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_reservation_user`
--

DROP TABLE IF EXISTS `core_reservation_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_reservation_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `resaId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `core_reservation_user_resaId_fkey` (`resaId`),
  KEY `core_reservation_user_userId_fkey` (`userId`),
  CONSTRAINT `core_reservation_user_resaId_fkey` FOREIGN KEY (`resaId`) REFERENCES `core_reservation` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `core_reservation_user_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `core_user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_reservation_user`
--

LOCK TABLES `core_reservation_user` WRITE;
/*!40000 ALTER TABLE `core_reservation_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `core_reservation_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_todo`
--

DROP TABLE IF EXISTS `core_todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_todo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `homeId` int NOT NULL,
  `task` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `core_todo_homeId_fkey` (`homeId`),
  CONSTRAINT `core_todo_homeId_fkey` FOREIGN KEY (`homeId`) REFERENCES `core_home` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_todo`
--

LOCK TABLES `core_todo` WRITE;
/*!40000 ALTER TABLE `core_todo` DISABLE KEYS */;
/*!40000 ALTER TABLE `core_todo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_user`
--

DROP TABLE IF EXISTS `core_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pseudo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `core_user_email_key` (`email`),
  UNIQUE KEY `core_user_pseudo_key` (`pseudo`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_user`
--

LOCK TABLES `core_user` WRITE;
/*!40000 ALTER TABLE `core_user` DISABLE KEYS */;
INSERT INTO `core_user` VALUES (1,'tr0@yopmail.com',NULL,NULL,'name0','$2b$10$xfPtN0lCqDu.yzwayI11ee9nk.ph24a4iRo5P3j2JjyERcRxGLx0C'),(2,'tr1@yopmail.com',NULL,NULL,'name1','$2b$10$xfPtN0lCqDu.yzwayI11ee9nk.ph24a4iRo5P3j2JjyERcRxGLx0C'),(3,'tr2@yopmail.com',NULL,NULL,'name2','$2b$10$xfPtN0lCqDu.yzwayI11ee9nk.ph24a4iRo5P3j2JjyERcRxGLx0C'),(4,'tr3@yopmail.com',NULL,NULL,'name3','$2b$10$xfPtN0lCqDu.yzwayI11ee9nk.ph24a4iRo5P3j2JjyERcRxGLx0C'),(5,'tr4@yopmail.com',NULL,NULL,'name4','$2b$10$xfPtN0lCqDu.yzwayI11ee9nk.ph24a4iRo5P3j2JjyERcRxGLx0C'),(6,'tr5@yopmail.com',NULL,NULL,'name5','$2b$10$xfPtN0lCqDu.yzwayI11ee9nk.ph24a4iRo5P3j2JjyERcRxGLx0C');
/*!40000 ALTER TABLE `core_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_user_invit`
--

DROP TABLE IF EXISTS `core_user_invit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_user_invit` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hostId` int NOT NULL,
  `guestId` int NOT NULL,
  `calendarId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `core_user_invit_hostId_fkey` (`hostId`),
  KEY `core_user_invit_guestId_fkey` (`guestId`),
  KEY `core_user_invit_calendarId_fkey` (`calendarId`),
  CONSTRAINT `core_user_invit_calendarId_fkey` FOREIGN KEY (`calendarId`) REFERENCES `core_calendar` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `core_user_invit_guestId_fkey` FOREIGN KEY (`guestId`) REFERENCES `core_user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `core_user_invit_hostId_fkey` FOREIGN KEY (`hostId`) REFERENCES `core_user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_user_invit`
--

LOCK TABLES `core_user_invit` WRITE;
/*!40000 ALTER TABLE `core_user_invit` DISABLE KEYS */;
/*!40000 ALTER TABLE `core_user_invit` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-25 12:53:21
