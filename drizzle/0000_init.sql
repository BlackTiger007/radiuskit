CREATE TABLE
	`nas` (
		`id` int AUTO_INCREMENT NOT NULL,
		`nasname` varchar(128) NOT NULL,
		`shortname` varchar(32),
		`type` varchar(30) DEFAULT 'other',
		`ports` int,
		`secret` varchar(60) NOT NULL DEFAULT 'secret',
		`server` varchar(64),
		`community` varchar(50),
		`description` varchar(200) DEFAULT 'RADIUS Client',
		`require_ma` varchar(4) DEFAULT 'auto',
		`limit_proxy_state` varchar(4) DEFAULT 'auto',
		CONSTRAINT `nas_id` PRIMARY KEY (`id`)
	);

--> statement-breakpoint
CREATE TABLE
	`nasreload` (
		`nasipaddress` varchar(15) NOT NULL,
		`reloadtime` datetime NOT NULL,
		CONSTRAINT `nasreload_nasipaddress` PRIMARY KEY (`nasipaddress`)
	);

--> statement-breakpoint
CREATE TABLE
	`radacct` (
		`radacctid` bigint AUTO_INCREMENT NOT NULL,
		`acctsessionid` varchar(64) NOT NULL DEFAULT '',
		`acctuniqueid` varchar(32) NOT NULL DEFAULT '',
		`username` varchar(64) NOT NULL DEFAULT '',
		`groupname` varchar(64) NOT NULL DEFAULT '',
		`realm` varchar(64) DEFAULT '',
		`nasipaddress` varchar(15) NOT NULL DEFAULT '',
		`nasportid` varchar(32),
		`nasporttype` varchar(32),
		`acctstarttime` datetime NOT NULL DEFAULT '1999-12-31 23:00:00.000',
		`acctupdatetime` datetime NOT NULL DEFAULT '1999-12-31 23:00:00.000',
		`acctstoptime` datetime NOT NULL DEFAULT '1999-12-31 23:00:00.000',
		`acctinterval` int,
		`acctsessiontime` int unsigned,
		`acctauthentic` varchar(32),
		`connectinfo_start` varchar(50),
		`connectinfo_stop` varchar(50),
		`acctinputoctets` bigint,
		`acctoutputoctets` bigint,
		`calledstationid` varchar(50) NOT NULL DEFAULT '',
		`callingstationid` varchar(50) NOT NULL DEFAULT '',
		`acctterminatecause` varchar(32) NOT NULL DEFAULT '',
		`servicetype` varchar(32),
		`framedprotocol` varchar(32),
		`framedipaddress` varchar(15) NOT NULL DEFAULT '',
		`framedipv6address` varchar(45) NOT NULL DEFAULT '',
		`framedipv6prefix` varchar(45) NOT NULL DEFAULT '',
		`framedinterfaceid` varchar(44) NOT NULL DEFAULT '',
		`delegatedipv6prefix` varchar(45) NOT NULL DEFAULT '',
		`class` varchar(64),
		CONSTRAINT `radacct_radacctid` PRIMARY KEY (`radacctid`),
		CONSTRAINT `radacct_acctuniqueid_unique` UNIQUE (`acctuniqueid`)
	);

--> statement-breakpoint
CREATE TABLE
	`radcheck` (
		`id` int unsigned AUTO_INCREMENT NOT NULL,
		`username` varchar(64) NOT NULL DEFAULT '',
		`attribute` varchar(64) NOT NULL DEFAULT '',
		`op` char(2) NOT NULL DEFAULT '==',
		`value` varchar(253) NOT NULL DEFAULT '',
		CONSTRAINT `radcheck_id` PRIMARY KEY (`id`)
	);

--> statement-breakpoint
CREATE TABLE
	`radgroupcheck` (
		`id` int unsigned AUTO_INCREMENT NOT NULL,
		`groupname` varchar(64) NOT NULL DEFAULT '',
		`attribute` varchar(64) NOT NULL DEFAULT '',
		`op` char(2) NOT NULL DEFAULT '==',
		`value` varchar(253) NOT NULL DEFAULT '',
		CONSTRAINT `radgroupcheck_id` PRIMARY KEY (`id`)
	);

--> statement-breakpoint
CREATE TABLE
	`radgroupreply` (
		`id` int unsigned AUTO_INCREMENT NOT NULL,
		`groupname` varchar(64) NOT NULL DEFAULT '',
		`attribute` varchar(64) NOT NULL DEFAULT '',
		`op` char(2) NOT NULL DEFAULT '=',
		`value` varchar(253) NOT NULL DEFAULT '',
		CONSTRAINT `radgroupreply_id` PRIMARY KEY (`id`)
	);

--> statement-breakpoint
CREATE TABLE
	`radpostauth` (
		`id` int AUTO_INCREMENT NOT NULL,
		`username` varchar(64) NOT NULL DEFAULT '',
		`pass` varchar(64) NOT NULL DEFAULT '',
		`reply` varchar(32) NOT NULL DEFAULT '',
		`authdate` timestamp NOT NULL DEFAULT (now ()) ON UPDATE CURRENT_TIMESTAMP,
		`class` varchar(64) NOT NULL DEFAULT '',
		CONSTRAINT `radpostauth_id` PRIMARY KEY (`id`)
	);

--> statement-breakpoint
CREATE TABLE
	`radreply` (
		`id` int unsigned AUTO_INCREMENT NOT NULL,
		`username` varchar(64) NOT NULL DEFAULT '',
		`attribute` varchar(64) NOT NULL DEFAULT '',
		`op` char(2) NOT NULL DEFAULT '=',
		`value` varchar(253) NOT NULL DEFAULT '',
		CONSTRAINT `radreply_id` PRIMARY KEY (`id`)
	);

--> statement-breakpoint
CREATE TABLE
	`radusergroup` (
		`id` int unsigned AUTO_INCREMENT NOT NULL,
		`username` varchar(64) NOT NULL DEFAULT '',
		`groupname` varchar(64) NOT NULL DEFAULT '',
		`priority` int NOT NULL DEFAULT 1,
		CONSTRAINT `radusergroup_id` PRIMARY KEY (`id`)
	);

--> statement-breakpoint
CREATE TABLE
	`session` (
		`id` varchar(255) NOT NULL,
		`user_id` varchar(255) NOT NULL,
		`expires_at` datetime NOT NULL,
		CONSTRAINT `session_id` PRIMARY KEY (`id`)
	);

--> statement-breakpoint
CREATE TABLE
	`user` (
		`id` varchar(255) NOT NULL,
		`username` varchar(32) NOT NULL,
		`password_hash` varchar(255) NOT NULL,
		CONSTRAINT `user_id` PRIMARY KEY (`id`),
		CONSTRAINT `user_username_unique` UNIQUE (`username`)
	);

--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE no action ON UPDATE no action;

--> statement-breakpoint
CREATE INDEX `nasname_idx` ON `nas` (`nasname`);

--> statement-breakpoint
CREATE INDEX `username_idx` ON `radacct` (`username`);

--> statement-breakpoint
CREATE INDEX `framedipaddress_idx` ON `radacct` (`framedipaddress`);

--> statement-breakpoint
CREATE INDEX `framedipv6address_idx` ON `radacct` (`framedipv6address`);

--> statement-breakpoint
CREATE INDEX `framedipv6prefix_idx` ON `radacct` (`framedipv6prefix`);

--> statement-breakpoint
CREATE INDEX `framedinterfaceid_idx` ON `radacct` (`framedinterfaceid`);

--> statement-breakpoint
CREATE INDEX `delegatedipv6prefix_idx` ON `radacct` (`delegatedipv6prefix`);

--> statement-breakpoint
CREATE INDEX `acctsessionid_idx` ON `radacct` (`acctsessionid`);

--> statement-breakpoint
CREATE INDEX `acctsessiontime_idx` ON `radacct` (`acctsessiontime`);

--> statement-breakpoint
CREATE INDEX `acctstarttime_idx` ON `radacct` (`acctstarttime`);

--> statement-breakpoint
CREATE INDEX `acctinterval_idx` ON `radacct` (`acctinterval`);

--> statement-breakpoint
CREATE INDEX `acctstoptime_idx` ON `radacct` (`acctstoptime`);

--> statement-breakpoint
CREATE INDEX `nasipaddress_idx` ON `radacct` (`nasipaddress`);

--> statement-breakpoint
CREATE INDEX `bulk_close_idx` ON `radacct` (`acctstoptime`, `nasipaddress`, `acctstarttime`);

--> statement-breakpoint
CREATE INDEX `username_idx` ON `radcheck` (`username`);

--> statement-breakpoint
CREATE INDEX `groupname_idx` ON `radgroupcheck` (`groupname`);

--> statement-breakpoint
CREATE INDEX `groupname_idx` ON `radgroupreply` (`groupname`);

--> statement-breakpoint
CREATE INDEX `username_idx` ON `radreply` (`username`);

--> statement-breakpoint
CREATE INDEX `username_idx` ON `radusergroup` (`username`);