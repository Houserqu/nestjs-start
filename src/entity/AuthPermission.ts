import { Column, Entity } from "typeorm";

@Entity("auth_permission", { schema: "nestjs" })
export class AuthPermission {
  @Column("varchar", {
    primary: true,
    name: "code",
    comment: "权限code",
    length: 225,
  })
  code: string;

  @Column("varchar", { name: "name", comment: "权限名称", length: 225 })
  name: string;

  @Column("varchar", {
    name: "type",
    comment: "权限类型：API=接口，MENU=菜单，FUNCTION=功能",
    length: 35,
    default: () => "'API'",
  })
  type: string;

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
