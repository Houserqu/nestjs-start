import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "auth_role", timestamps: false })
export class AuthRole extends Model<AuthRole> {
    @Column({ field: "role_id", primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    roleId?: number;

    @Column({ type: DataType.STRING(225), comment: "\u89D2\u8272\u540D\u79F0" })
    name!: string;

    @Column({ field: "created_at", type: DataType.DATE })
    createdAt!: Date;

    @Column({ field: "updated_at", type: DataType.DATE })
    updatedAt!: Date;
}