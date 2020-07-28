CREATE TABLE `config` (
  `code` varchar(225) NOT NULL DEFAULT '' COMMENT '描述',
  `desc` varchar(225) DEFAULT NULL COMMENT '配置说明',
  `type` varchar(225) NOT NULL DEFAULT '' COMMENT '配置类型',
  `content1` text COMMENT '配置内容1',
  `content2` text COMMENT '配置内容2',
  `content3` text COMMENT '配置内容3',
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;