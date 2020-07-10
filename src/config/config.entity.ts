import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("config")
export class Config {
  @PrimaryColumn({ type: "varchar", name: "code" })
  code: string;

  @Column("varchar", { name: "desc", nullable: true, unique: true, length: 225 })
  desc: string | null;

  @Column("varchar", { name: "type", nullable: false, length: 225 })
  type: string | null;

  @Column("text", { name: "ext1", nullable: true })
  ext1: string | null;

  @Column("text", { name: "ext2", nullable: true })
  ext2: string | null;

  @Column("text", { name: "ext3", nullable: true })
  ext3: string | null;
}
