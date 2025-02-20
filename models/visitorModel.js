const mysql = require("mysql2/promise");

//DB 연결
const pool = mysql.createPool({
  host: "localhost", //DB가 설치된 호스트 IP주소
  user: "root", // DB 접속 유저 이름
  password: "", // DB 접속 비밀번호
  database: "user", // DB 이름
});

const getAll = async () => {
  const query = "SELECT * FROM users";
  const [rows] = await pool.query(query);
  return rows;
};

// 해당하는 데이터 하나만 가져오기
const getOne = async (userid) => {
  const query = `SELECT * FROM users WHERE id = ?`;
  try {
    const [rows] = await pool.query(query, [userid]);
    return rows[0] || null;
  } catch (error) {
    console.error("데이터 조회 중 오류 발생:", error);
    return null;
  }
};

const postData = async (data) => {
  try {
    const query = `INSERT INTO users (userid, name, comment) VALUES (?, ?, ?)`;
    await pool.query(query, [data.userid, data.name, data.comment]);
    return "데이터가 등록되었습니다.";
  } catch (error) {
    console.error("데이터 삽입 오류:", error);
    return "데이터 등록에 실패했습니다.";
  }
};

// 해당 아이디를 가진 모든 데이터 삭제
const deleteRow = async (id) => {
  const query = `DELETE FROM users WHERE id = ?}`;
  try {
    await pool.query(query, [id]);
  } catch (e) {
    console.log(e);
  }
};

// 해당 아디디를 가진 데이터 수정
const updateRow = async (data) => {
  const query = `UPDATE users SET name = ?, comment = ?
  WHERE id = ?`;
  try {
    await pool.query(query, [data.name, data.comment, Number(data.id)]);
  } catch (e) {
    console.log(e);
  }
};
module.exports = { getAll, getOne, postData, deleteRow, updateRow };
