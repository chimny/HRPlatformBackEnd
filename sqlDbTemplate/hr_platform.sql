-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 21 Sty 2023, 18:20
-- Wersja serwera: 10.4.25-MariaDB
-- Wersja PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `hr_platform`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `peoplelist`
--

CREATE TABLE `peoplelist` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `peoplelist`
--

INSERT INTO `peoplelist` (`id`, `name`, `surName`) VALUES
('9fbbf2ca-8c4e-11ed-9e20-382c4a1f0865', 'sss', 'aaa'),
('b4a302fa-8d23-11ed-a92f-382c4a1f0865', 'Hello', 'Roman');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `peoplelist_positions`
--

CREATE TABLE `peoplelist_positions` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `personId` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salary` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `peoplelist_positions`
--

INSERT INTO `peoplelist_positions` (`id`, `personId`, `position`, `salary`) VALUES
('02a4ba81-8c50-11ed-9e20-382c4a1f0865', '9fbbf2ca-8c4e-11ed-9e20-382c4a1f0865', 'Trainee', 222),
('c16208f2-8d23-11ed-a92f-382c4a1f0865', 'b4a302fa-8d23-11ed-a92f-382c4a1f0865', 'Assistant', 5);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `position`
--

CREATE TABLE `position` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `position`
--

INSERT INTO `position` (`id`, `position`) VALUES
('838ab3be-fd3c-11ec-bfa9-382c4a1f0865', 'Assistant'),
('906e49ce-fd3c-11ec-bfa9-382c4a1f0865', 'Junior Specialist'),
('a5856532-fd3c-11ec-bfa9-382c4a1f0865', 'Manager'),
('9afbd4d2-fd3c-11ec-bfa9-382c4a1f0865', 'Senior Specialist'),
('96384146-fd3c-11ec-bfa9-382c4a1f0865', 'Specialist'),
('711b99ec-fd3c-11ec-bfa9-382c4a1f0865', 'Trainee');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `position_description`
--

CREATE TABLE `position_description` (
  `position` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position level` tinyint(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `position_description`
--

INSERT INTO `position_description` (`position`, `description`, `position level`) VALUES
('Assistant', 'supports team members in simple tasks', 1),
('Junior Specialist', 'is able to handle small requests by itself', 2),
('Manager', 'coordinates the work among team members', 5),
('Senior Specialist', 'works on most advanced projects, supports team members with less expierence', 4),
('Specialist', 'can handle regular tasks, supports team members with less expierience', 3),
('Trainee', 'learns everything from the scratch', 0);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `peoplelist`
--
ALTER TABLE `peoplelist`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `Person ID` (`id`) USING BTREE,
  ADD KEY `Name` (`name`) USING BTREE;

--
-- Indeksy dla tabeli `peoplelist_positions`
--
ALTER TABLE `peoplelist_positions`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `PersonID` (`personId`) USING BTREE,
  ADD KEY `Position` (`position`) USING BTREE;

--
-- Indeksy dla tabeli `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `Position` (`position`) USING BTREE;

--
-- Indeksy dla tabeli `position_description`
--
ALTER TABLE `position_description`
  ADD PRIMARY KEY (`position`);

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `peoplelist_positions`
--
ALTER TABLE `peoplelist_positions`
  ADD CONSTRAINT `PersonID` FOREIGN KEY (`personId`) REFERENCES `peoplelist` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `Position` FOREIGN KEY (`Position`) REFERENCES `position` (`Position`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `position_description`
--
ALTER TABLE `position_description`
  ADD CONSTRAINT `FK_position_description_position` FOREIGN KEY (`position`) REFERENCES `position` (`Position`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
