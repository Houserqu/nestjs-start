import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "user", timestamps: false })
export class User extends Model<User> {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;

    @Column({ allowNull: true, type: DataType.STRING(225) })
    nickname?: string;

    @Column({ allowNull: true, type: DataType.STRING(35), comment: "\u624B\u673A" })
    phone?: string;

    @Column({ allowNull: true, type: DataType.STRING(125) })
    password?: string;

    @Column({ allowNull: true, type: DataType.STRING })
    remark?: string;

    @Column({ allowNull: true, type: DataType.INTEGER })
    type?: number;

    @Column({ allowNull: true, type: DataType.STRING(125) })
    openid?: string;

    @Column({ allowNull: true, type: DataType.STRING(125) })
    @Index({ name: "unionid", using: "BTREE", order: "ASC", unique: true })
    unionid?: string;

    @Column({ allowNull: true, type: DataType.STRING(35) })
    country?: string;

    @Column({ allowNull: true, type: DataType.STRING(35) })
    city?: string;

    @Column({ allowNull: true, type: DataType.STRING(35) })
    province?: string;

    @Column({ allowNull: true, type: DataType.INTEGER })
    gender?: number;

    @Column({ field: "avatar_url", allowNull: true, type: DataType.STRING(225) })
    avatarUrl?: string;

    @Column({ allowNull: true, type: DataType.STRING(35), comment: "\u6CE8\u518C\u65F6appid" })
    appid?: string;

    @Column({ field: "created_at", type: DataType.DATE })
    createdAt!: Date;

    @Column({ field: "updated_at", type: DataType.DATE })
    updatedAt!: Date;
}