import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("auth_role_permission", { schema: "nestjs" })
export class AuthRolePermission {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "role_id", comment: "角色id" })
  roleId: number;

  @Column("int", { name: "permission_id", comment: "权限id" })
  permissionId: number;

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
