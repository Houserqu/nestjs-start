import { Column, Entity } from "typeorm";

@Entity("config", { schema: "nestjs" })
export class Config {
  @Column("varchar", {
    primary: true,
    name: "code",
    comment: "配置code",
    length: 225,
  })
  code: string;

  @Column("varchar", {
    name: "desc",
    nullable: true,
    comment: "说明",
    length: 225,
  })
  desc: string | null;

  @Column("varchar", { name: "type", comment: "类型", length: 225 })
  type: string;

  @Column("text", { name: "content1", nullable: true, comment: "内容1" })
  content1: string | null;

  @Column("text", { name: "content2", nullable: true, comment: "内容2" })
  content2: string | null;

  @Column("text", { name: "content3", nullable: true, comment: "内容3" })
  content3: string | null;

  @Column("timestamp", {
    name: "created",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  created: Date | null;

  @Column("timestamp", {
    name: "updated",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updated: Date | null;
}
