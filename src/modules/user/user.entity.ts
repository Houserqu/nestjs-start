import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("phone", ["phone"], { unique: true })
@Entity("user")
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "nickname", nullable: true, length: 255 })
  nickname: string | null;

  @Column("varchar", { name: "phone", unique: true, length: 11 })
  phone: string;

  @Column("varchar", { name: "password", nullable: true, length: 255 })
  password: string | null;

  @Column("text", { name: "remark", nullable: true })
  remark: string | null;

  @Column("int", { name: "type", nullable: true, default: () => "'1'" })
  type: number | null;

  @Column("varchar", { name: "openid", nullable: true, length: 255 })
  openid: string | null;

  @Column("varchar", { name: "unionid", nullable: true, length: 255 })
  unionid: string | null;

  @Column("varchar", { name: "country", nullable: true, length: 255 })
  country: string | null;

  @Column("varchar", { name: "province", nullable: true, length: 255 })
  province: string | null;

  @Column("varchar", { name: "city", nullable: true, length: 255 })
  city: string | null;

  @Column("int", { name: "gender", nullable: true, default: () => "'0'" })
  gender: number | null;

  @Column("varchar", { name: "avatarUrl", nullable: true, length: 255 })
  avatarUrl: string | null;

  @Column("varchar", { name: "appid", nullable: true, length: 35 })
  appid: string | null;

  @Column("timestamp", {
    name: "created",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP"
  })
  created: Date | null;

  @Column("timestamp", {
    name: "updated",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP"
  })
  updated: Date | null;
}
