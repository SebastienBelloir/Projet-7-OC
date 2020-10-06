-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 06, 2020 at 07:58 AM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `groupomania_sqldb`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `idArticle` int(11) NOT NULL,
  `title` varchar(70) DEFAULT NULL,
  `description` mediumtext,
  `imageUrl` text,
  `contenu` longtext NOT NULL,
  `datetime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `auteur_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`idArticle`, `title`, `description`, `imageUrl`, `contenu`, `datetime`, `auteur_id`) VALUES
(1, 'Article de Jc', 'super article', 'http://localhost:3000/images/43ec643e415690208f5d933cf9dcef84.jpg1601970727136.jpg', 'Article de JcArticle de JcArticle de Jc', '2020-10-06 07:52:07.143896', 2),
(2, 'Article de seb', 'Article de seb', 'http://localhost:3000/images/1586939508-1786-card.jpg1601970809043.jpg', 'Article de sebArticle de sebArticle de sebArticle de sebArticle de seb', '2020-10-06 07:53:29.046698', 1);

-- --------------------------------------------------------

--
-- Table structure for table `share`
--

CREATE TABLE `share` (
  `sharedIdUser` int(11) NOT NULL,
  `idArticle` int(11) NOT NULL,
  `commentaire` longtext,
  `datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `share`
--

INSERT INTO `share` (`sharedIdUser`, `idArticle`, `commentaire`, `datetime`) VALUES
(1, 1, 'j\'adore cet article !', '2020-10-06 07:53:04'),
(3, 1, 'Excellent article !', '2020-10-06 07:58:28');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `nom` varchar(45) NOT NULL,
  `prenom` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `departement_entreprise` varchar(45) DEFAULT NULL,
  `isadmin` tinyint(4) DEFAULT NULL,
  `password` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`idUser`, `nom`, `prenom`, `email`, `departement_entreprise`, `isadmin`, `password`) VALUES
(1, 'Belloir', 'Sébastien', 'seb@test.com', 'compta', 1, '$2b$10$M3LhUQS/JnwgPAa/EtD1U.1DrxyQrOn1nsdW09S3JM2iOS2PvGX3C'),
(2, 'mika', 'jc', 'jc@mika.fr', 'sales', NULL, '$2b$10$YrH6LQXwmbiFvWaPzh.MBO1ej2YgigYrlMjYwV824ZHA/6Oaa.yEO'),
(3, 'john', 'john', 'john@john.com', 'RH', NULL, '$2b$10$GKExZZKSP9/T/KlMr/J3E.qKemSZyeAzLcGeZiMc/m8bOCXwtrQCe');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`idArticle`),
  ADD KEY `fk_Articles_User_idx` (`auteur_id`);

--
-- Indexes for table `share`
--
ALTER TABLE `share`
  ADD PRIMARY KEY (`sharedIdUser`,`idArticle`),
  ADD KEY `fk_User_has_Articles_Articles1_idx` (`idArticle`),
  ADD KEY `fk_User_has_Articles_User1_idx` (`sharedIdUser`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `Email_UNIQUE` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `idArticle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `fk_Articles_User` FOREIGN KEY (`auteur_id`) REFERENCES `users` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `share`
--
ALTER TABLE `share`
  ADD CONSTRAINT `fk_User_has_Articles_Articles1` FOREIGN KEY (`idArticle`) REFERENCES `articles` (`idArticle`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_User_has_Articles_User1` FOREIGN KEY (`sharedIdUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
