import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "jwt", // 데이터베이스 이름
});

export default db; // ✅ default export 추가
