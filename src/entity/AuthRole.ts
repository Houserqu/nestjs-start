import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("auth_role", { schema: "nestjs" })
export class AuthRole {
  @PrimaryGeneratedColumn({ type: "int", name: "role_id", unsigned: true })
  roleId: number;

  @Column("varchar", { name: "name", comment: "角色名称", length: 225 })
  name: string;

  @Column("timestamp", { name: "created", default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @Column("timestamp", { name: "updated", default: () => "CURRENT_TIMESTAMP" })
  updated: Date;
}
