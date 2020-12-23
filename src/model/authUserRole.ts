import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "auth_user_role", timestamps: false })
export class AuthUserRole extends Model<AuthUserRole> {
    @Column({ field: "user_id", primaryKey: true, type: DataType.INTEGER })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    userId!: number;

    @Column({ field: "role_id", primaryKey: true, type: DataType.INTEGER })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    roleId!: number;

    @Column({ field: "created_at", allowNull: true, type: DataType.DATE })
    createdAt?: Date;

    @Column({ field: "updated_at", allowNull: true, type: DataType.DATE })
    updatedAt?: Date;
}