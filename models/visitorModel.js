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

// getAll 메서드 추가
Visitor.getAll = async () => {
  return await Visitor.findAll();
};

// postData 메서드 추가 (방명록 등록 기능)
Visitor.postData = async ({ userid, name, comment }) => {
  return await Visitor.create({ userid, name, comment });
};

//  특정 방문자 정보 가져오는 메서드 추가
Visitor.getOne = async (id) => {
  return await Visitor.findByPk(id);
};

//  방명록 삭제 기능 추가
Visitor.deleteRow = async (id) => {
  return await Visitor.destroy({ where: { id } });
};

//  방명록 업데이트 기능 추가
Visitor.updateRow = async ({ id, userid, name, comment }) => {
  return await Visitor.update({ userid, name, comment }, { where: { id } });
};

// 데이터베이스 연결 확인
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((error) => {
    console.log("데이터베이스 연결 실패: ", error);
  });

export default Visitor;
