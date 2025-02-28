import { DataTypes } from "sequelize";
import db from "../config/db.js"; // 데이터베이스 설정 불러오기

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
    timestamps: false, // ⬅️ createdAt, updatedAt 자동 추가 방지
    tableName: "Users", // ⬅️ 테이블명 명시 (대소문자 일치)
  }
);

export default User;
