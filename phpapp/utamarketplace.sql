CREATE TABLE `user_details` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(60) NOT NULL,
  `lastName` varchar(60) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `isActive` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `user_details`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `userId` (`userId`);

ALTER TABLE `user_details`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--------inserting roles values------
INSERT INTO `roles` (`roleId`, `roleName`) VALUES (1, 'Admin'), (2, 'SchoolAdmin'), (3, 'Student'), (4, 'BusinessOwner');

ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

----creating contact details---
CREATE TABLE `contact_us` ( `id` int(11) NOT NULL, `firstName` varchar(60) NOT NULL, `lastName` varchar(60) NOT NULL, `phoneNumber` varchar(10) DEFAULT NULL, `email` varchar(255) NOT NULL, `comment` varchar(1000) NOT NULL, `status` varchar(255) NOT NULL DEFAULT 'Pending', `actionTakenBy` int(11) DEFAULT NULL ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--alter the contact_us auto increment the id---
ALTER TABLE `contact_us` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `contact_us`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=247;

ALTER TABLE `contact_us`
  ADD CONSTRAINT `contact_us_ibfk_1` FOREIGN KEY (`actionTakenBy`) REFERENCES `user_details` (`userId`);

----Registering clubs-----
CREATE TABLE `Clubs` (
  `clubId` int(11) NOT NULL,
  `clubName` varchar(255) NOT NULL,
  `clubDesc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-----alter table clubs add keys----
ALTER TABLE `clubs`
  ADD PRIMARY KEY (`clubName`),
  ADD UNIQUE KEY `id` (`clubId`);

----- alter table clubs and auto increment id---

ALTER TABLE `clubs`
  MODIFY `clubId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2

-------create table clubmembership details----
CREATE TABLE `clubsmembersdetails` (
  `clubName` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `isJoined` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-----add a column clubid--
ALTER TABLE clubsmembersdetails
ADD clubId int(11) NOT NULL  

------ add foreign constraint to clubmembershipdetails---
ALTER TABLE `clubsmembersdetails`
  ADD CONSTRAINT `clubsmemberdetails_ibfk_1` FOREIGN KEY (`clubName`) REFERENCES `clubs` (`clubName`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `clubsmembersdetails`
  
  ADD UNIQUE KEY `clubId` (`clubId`),
  ADD KEY `userId` (`userId`);

ALTER TABLE `clubsmembersdetails` MODIFY userId int(11) NOT NULL;

----clubmembers reference with userid---
ALTER TABLE `clubsmembersdetails`
  ADD CONSTRAINT `clubsmember_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user_details` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE clubsmembersdetails
ADD reasontoleave varchar(255)

CREATE TABLE `clubsmembersdetails` ( `clubName` varchar(255) NOT NULL PRIMARY KEY, `userId` int(11) DEFAULT NULL , `isJoined` int(1) NOT NULL, clubId int(11) UNIQUE KEY AUTO_INCREMENT, reasontoleave varchar(255) DEFAULT NULL ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `products` (
  `pId` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `ProductName` varchar(255) NOT NULL,
  `BusinessName` varchar(255) NOT NULL,
  `ProductCategory` varchar(255) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `productsBuyed` ( `bId` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `pId` int(11) NOT NULL , `ProductName` varchar(255) NOT NULL, `BusinessName` varchar(255) NOT NULL, `price` DECIMAL(10,2) NOT NULL ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE productsbuyed ADD userId int(11) NOT NULL;

ALTER TABLE `productsbuyed`
  ADD CONSTRAINT `productsbuyed_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user_details` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `productsbuyed` 
ADD CONSTRAINT `productsbuyed_ibfk_2` FOREIGN KEY (`ProductName`) REFERENCES `products` (`ProductName`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE `productsBuyed` ( `bId` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,  `ProductName` varchar(255) NOT NULL,`userId` int(11)  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `shoppingcart` ( `sId` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `pId` int(11) NOT NULL , `ProductName` varchar(255) NOT NULL ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE shoppingcart ADD userId int(11) NOT NULL;

ALTER TABLE `shoppingcart`
  ADD CONSTRAINT `shoppingcart_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user_details` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `shoppingcart` 
ADD CONSTRAINT `shoppingcart_ibfk_2` FOREIGN KEY (`ProductName`) REFERENCES `products` (`ProductName`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE `postsposted` ( `postId` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,  `PostTitle` varchar(255) NOT NULL,`PostDesc` varchar(255) ,`userId` int(11)  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `postsposted`
  ADD CONSTRAINT `postsposted_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user_details` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE `postsAdvertisements` ( `advId` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `AdvTitle` varchar(255) NOT NULL,`AdvDesc` varchar(255) ,`userId` int(11) ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `postsAdvertisements` ADD CONSTRAINT `postsAdvertisements_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user_details` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE products ADD userId int(11) NOT NULL;

CREATE TABLE `Business` ( `BId` int(11) NOT NULL, `BusinessName` varchar(255) NOT NULL ) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `business` MODIFY `BId` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, AUTO_INCREMENT=23;