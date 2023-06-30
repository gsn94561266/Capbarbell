-- Adminer 4.8.1 MySQL 10.4.28-MariaDB dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `UID` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `ID` varchar(20) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Country` varchar(3) NOT NULL,
  `City` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `State` varchar(2) NOT NULL,
  `Address` varchar(100) NOT NULL,
  `Zip` varchar(20) NOT NULL,
  `Status` int(1) unsigned NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `UID` (`UID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `customer` (`UID`, `ID`, `Name`, `Country`, `City`, `State`, `Address`, `Zip`, `Status`) VALUES
(1,	'2001',	'Paul Bowman',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(2,	'2002',	'Nelly Orlando',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(3,	'2003',	'Sidney Luke',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(4,	'2004',	'Rock Ferdinand',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(5,	'2005',	'Dwight Joe',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(6,	'2006',	'Wendy Huxley',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(7,	'2007',	'Calvin Montgomery',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(8,	'2008',	'Zoe Hal',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(9,	'2009',	'Maurice Bloomer',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(10,	'2010',	'Broderick Marion',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	0),
(11,	'2011',	'Godfery Trollpoe',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(12,	'2012',	'Saxon Wild',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(13,	'2013',	'Hazel Toland',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(14,	'2014',	'Novia Wells',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(15,	'2015',	'Truman Margery',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(16,	'2016',	'Chloe Arnold',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(17,	'2017',	'Dale Alerander',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(18,	'2018',	'Cecil Whyet',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(19,	'2019',	'Jeff Carrie',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(20,	'2020',	'Sarah Eliot',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(21,	'2021',	'Irene Clapham',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(22,	'2022',	'Toby Lindsay',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(23,	'2023',	'Les Fanny',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(24,	'2024',	'Bruce Ralph',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(25,	'2025',	'Phyllis Church',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(26,	'2026',	'Tracy Woolley',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(27,	'2027',	'Donald Lew',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(28,	'2028',	'Sophia Adams',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(29,	'2029',	'Victor Jonson',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(30,	'2030',	'Grover Pitman',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(31,	'2031',	'Eleanore Faraday',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(32,	'2032',	'Chester Chaplin',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(33,	'2033',	'Ada Aled(k)',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(34,	'2034',	'Ian Oscar',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(35,	'2035',	'Wade Daniell',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(36,	'2036',	'CBaldwin Malory',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(37,	'2037',	'Leona Russell',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(38,	'2038',	'Raymond Whittier',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(39,	'2039',	'Blithe Gray',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1),
(40,	'2040',	'Samuel Esther',	'USA',	'Bakersfield',	'CA',	'33 Vincent Avenue Bakersfield,ca, 93304 United States',	'93304',	1);

DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `ID` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `Customer_ID` varchar(20) NOT NULL,
  `TotalAmount` decimal(16,2) NOT NULL,
  `Status` int(1) unsigned NOT NULL,
  `Order_Date` datetime NOT NULL,
  `Sales_Name` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `order` (`ID`, `Customer_ID`, `TotalAmount`, `Status`, `Order_Date`, `Sales_Name`) VALUES
(1,	'2001',	25000.00,	2,	'2021-05-25 00:00:00',	'David Walter'),
(2,	'2001',	49732.67,	3,	'2021-06-02 00:00:00',	'David Walter'),
(3,	'2001',	16151.73,	3,	'2021-06-04 00:00:00',	'David Walter'),
(4,	'2001',	62452.50,	3,	'2021-05-27 02:15:27',	'David Walter'),
(5,	'2001',	62248.30,	0,	'2021-06-07 02:15:27',	'David Walter'),
(6,	'2001',	87881.67,	3,	'2021-06-16 00:00:00',	'David Walter'),
(7,	'2001',	72000.27,	0,	'2021-06-21 02:15:27',	'David Walter'),
(8,	'2002',	18254.69,	2,	'2022-06-22 00:00:00',	'David Walter'),
(9,	'2001',	88559.41,	3,	'2022-06-22 00:00:00',	'David Walter'),
(10,	'2001',	32818.12,	3,	'2022-05-29 02:15:27',	'David Walter'),
(11,	'2001',	40264.46,	3,	'2022-06-06 02:15:27',	'David Walter'),
(12,	'2001',	58828.66,	3,	'2022-06-03 02:15:27',	'David Walter'),
(13,	'2001',	81573.87,	3,	'2022-05-29 02:15:27',	'David Walter'),
(14,	'2001',	97792.43,	3,	'2022-06-02 02:15:27',	'David Walter'),
(15,	'2001',	26614.90,	3,	'2022-06-11 02:15:27',	'David Walter'),
(16,	'2001',	91966.01,	0,	'2022-06-08 02:15:27',	'David Walter'),
(17,	'2001',	36960.69,	3,	'2022-06-06 02:15:27',	'David Walter'),
(18,	'2001',	9700.01,	0,	'2022-06-19 02:15:27',	'David Walter'),
(19,	'2001',	43417.94,	3,	'2023-06-15 02:15:27',	'David Walter'),
(20,	'2001',	17582.47,	0,	'2023-05-30 02:15:27',	'David Walter'),
(21,	'2001',	29394.06,	2,	'2023-06-04 02:15:27',	'David Walter'),
(22,	'2001',	70364.77,	1,	'2023-05-28 00:00:00',	'David Walter'),
(23,	'2001',	70962.43,	2,	'2023-06-20 02:15:27',	'David Walter'),
(24,	'2001',	10754.47,	2,	'2023-06-08 02:15:27',	'David Walter'),
(25,	'2001',	8754.04,	2,	'2023-06-12 02:15:27',	'David Walter'),
(26,	'2001',	57122.24,	3,	'2023-06-16 02:15:27',	'David Walter'),
(27,	'2001',	13848.30,	3,	'2023-06-11 02:15:27',	'David Walter'),
(28,	'2001',	57373.82,	3,	'2023-05-28 02:15:27',	'David Walter'),
(29,	'2002',	18254.30,	0,	'2022-06-21 02:15:27',	'David Walter'),
(30,	'2002',	88822.37,	3,	'2022-05-28 02:15:27',	'David Walter'),
(31,	'2002',	25217.26,	3,	'2022-06-08 02:15:27',	'David Walter'),
(32,	'2002',	5573.97,	3,	'2022-05-24 02:15:27',	'David Walter'),
(33,	'2002',	40193.89,	2,	'2022-06-17 00:00:00',	'David Walter'),
(34,	'2002',	53034.39,	2,	'2023-06-22 02:15:27',	'David Walter'),
(35,	'2002',	14877.93,	0,	'2023-06-15 02:15:27',	'David Walter'),
(36,	'2002',	90760.52,	1,	'2023-05-30 02:15:27',	'David Walter'),
(37,	'2002',	40133.44,	2,	'2023-05-27 02:15:27',	'David Walter'),
(38,	'2002',	80198.92,	1,	'2023-06-09 00:00:00',	'David Walter'),
(39,	'2002',	53443.68,	3,	'2023-06-02 02:15:27',	'David Walter'),
(40,	'2002',	50318.72,	0,	'2023-06-03 02:15:27',	'David Walter');

-- 2023-06-29 13:44:18
