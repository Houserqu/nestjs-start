import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("auth_role", { schema: "nestjs" })
export class AuthRole {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", comment: "角色名称", length: 225 })
  name: string;

  @Column("varchar", {
    name: "desc",
    nullable: true,
    comment: "说明",
    length: 225,
  })
  desc: string | null;

  @Column("timestamp", { name: "created", default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @Column("timestamp", { name: "updated", default: () => "CURRENT_TIMESTAMP" })
  updated: Date;
}
