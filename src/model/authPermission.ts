import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "auth_permission", timestamps: false })
export class AuthPermission extends Model<AuthPermission> {
    @Column({ primaryKey: true, type: DataType.STRING(225), comment: "\u6743\u9650code" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    code!: string;

    @Column({ type: DataType.STRING(225), comment: "\u6743\u9650\u540D\u79F0" })
    name!: string;

    @Column({ type: DataType.STRING(35), comment: "\u6743\u9650\u7C7B\u578B\uFF1AAPI=\u63A5\u53E3\uFF0CMENU=\u83DC\u5355\uFF0CFUNCTION=\u529F\u80FD" })
    type!: string;

    @Column({ field: "created_at", allowNull: true, type: DataType.DATE })
    createdAt?: Date;

    @Column({ field: "updated_at", allowNull: true, type: DataType.DATE })
    updatedAt?: Date;
}