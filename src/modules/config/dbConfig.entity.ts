import { Column, Entity, PrimaryColumn } from "typeorm";

/**
CREATE TABLE `config` (
  `code` varchar(225) NOT NULL DEFAULT '' COMMENT '描述',
  `desc` varchar(225) DEFAULT NULL COMMENT '配置说明',
  `type` varchar(225) NOT NULL DEFAULT '' COMMENT '配置类型',
  `content1` text COMMENT '配置内容1',
  `content2` text COMMENT '配置内容2',
  `content3` text COMMENT '配置内容3',
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 */

@Entity("config")
export class DBConfig {
  @PrimaryColumn({ type: "varchar", name: "code" })
  code: string;

  @Column("varchar", { name: "desc", nullable: true, length: 225 })
  desc: string | null;

  @Column("varchar", { name: "type", nullable: false, length: 225 })
  type: string | null;

  @Column("text", { name: "content1", nullable: true })
  content1: string | null;

  @Column("text", { name: "content2", nullable: true })
  content2: string | null;

  @Column("text", { name: "content3", nullable: true })
  content3: string | null;
}