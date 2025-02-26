import { Sequelize, DataTypes } from "sequelize";

// Sequelize 초기화
const sequelize = new Sequelize("user", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// Visitor 모델 정의
const Visitor = sequelize.define(
  "Visitor",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "users", // 실제 DB 테이블명 지정
    timestamps: false, // createdAt, updatedAt을 사용하지 않으려면 false
  }
);

export default Visitor;

// 데이터베이스 연결 확인
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((error) => {
    console.log("데이터베이스 연결 실패: ", error);
  });
