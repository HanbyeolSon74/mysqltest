import { Sequelize } from "sequelize";

const db = new Sequelize("jwt", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // 콘솔에 SQL 쿼리 출력 X
});

export default db;
