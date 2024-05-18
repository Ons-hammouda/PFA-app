-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 18 mai 2024 à 14:58
-- Version du serveur : 8.3.0
-- Version de PHP : 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `shop`
--

-- --------------------------------------------------------

--
-- Structure de la table `claims`
--

DROP TABLE IF EXISTS `claims`;
CREATE TABLE IF NOT EXISTS `claims` (
  `ClaimID` int NOT NULL AUTO_INCREMENT,
  `InsuranceID` int NOT NULL,
  `UserID` int NOT NULL,
  `ClaimDate` datetime NOT NULL,
  `Status` varchar(50) NOT NULL DEFAULT 'Pending',
  `ClaimDescription` text,
  `claimType` enum('Theft','Repair') NOT NULL,
  PRIMARY KEY (`ClaimID`),
  KEY `InsuranceID` (`InsuranceID`),
  KEY `UserID` (`UserID`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `claims`
--

INSERT INTO `claims` (`ClaimID`, `InsuranceID`, `UserID`, `ClaimDate`, `Status`, `ClaimDescription`, `claimType`) VALUES
(1, 18, 2, '2024-05-18 14:31:20', 'Pending', 'it been Stolen', 'Theft'),
(2, 19, 2, '2024-05-18 14:48:54', 'Pending', 'dddd', 'Repair'),
(3, 20, 2, '2024-05-18 15:34:47', 'Pending', 'TESTTESTTESTTESTTEST', 'Repair');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
