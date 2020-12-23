import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "auth_role_permission", timestamps: false })
export class AuthRolePermission extends Model<AuthRolePermission> {
    @Column({ field: "role_id", primaryKey: true, type: DataType.INTEGER, comment: "\u89D2\u8272id" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    roleId!: number;

    @Column({ primaryKey: true, type: DataType.STRING(225), comment: "\u6743\u9650code" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    code!: string;

    @Column({ field: "created_at", allowNull: true, type: DataType.DATE })
    createdAt?: Date;

    @Column({ field: "updated_at", allowNull: true, type: DataType.DATE })
    updatedAt?: Date;
}