import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("unionid", ["unionid"], { unique: true })
@Entity("user", { schema: "nestjs" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "nickname", nullable: true, length: 225 })
  nickname: string | null;

  @Column("varchar", {
    name: "phone",
    nullable: true,
    comment: "手机",
    length: 35,
  })
  phone: string | null;

  @Column("varchar", { name: "password", nullable: true, length: 125 })
  password: string | null;

  @Column("text", { name: "remark", nullable: true })
  remark: string | null;

  @Column("int", { name: "type", nullable: true, default: () => "'1'" })
  type: number | null;

  @Column("varchar", { name: "openid", nullable: true, length: 125 })
  openid: string | null;

  @Column("varchar", {
    name: "unionid",
    nullable: true,
    unique: true,
    length: 125,
  })
  unionid: string | null;

  @Column("varchar", { name: "country", nullable: true, length: 35 })
  country: string | null;

  @Column("varchar", { name: "city", nullable: true, length: 35 })
  city: string | null;

  @Column("varchar", { name: "province", nullable: true, length: 35 })
  province: string | null;

  @Column("int", { name: "gender", nullable: true })
  gender: number | null;

  @Column("varchar", { name: "avatar_url", nullable: true, length: 225 })
  avatarUrl: string | null;

  @Column("varchar", {
    name: "appid",
    nullable: true,
    comment: "注册时appid",
    length: 35,
  })
  appid: string | null;

  @Column("timestamp", { name: "created", default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @Column("timestamp", { name: "updated", default: () => "CURRENT_TIMESTAMP" })
  updated: Date;
}
