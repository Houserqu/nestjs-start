import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table({tableName: 'user', underscored: true})
export class User extends Model{
  @PrimaryKey
  @Column
  id: number;

  @Column
  nickname: string | null;

  @Column
  phone: string;

  @Column
  password: string | null;

  @Column
  remark: string | null;

  @Column
  type: number | null;

  @Column
  openid: string | null;

  @Column
  unionid: string | null;

  @Column
  country: string | null;

  @Column
  province: string | null;

  @Column
  city: string | null;

  @Column
  gender: number | null;

  @Column
  avatarUrl: string | null;

  @Column
  appid: string | null;

  @Column
  createdAt: Date | null;

  @Column
  updatedAt: Date | null;
}
