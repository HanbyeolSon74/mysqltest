import { DataTypes } from "sequelize";
import bcrypt from "bcrypt"; // 비밀번호 해싱 추가
import db from "../config/db.js";

const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "Users",
    freezeTableName: true, // 자동 복수형 변환 방지
    charset: "utf8mb4", // MySQL에서 한글 깨짐 방지
    collate: "utf8mb4_general_ci",
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);

export default User;
