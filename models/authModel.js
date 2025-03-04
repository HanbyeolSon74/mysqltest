import db from "../config/db.js";

// 아이디로 사용자 정보 조회
export const getUserByUsername = async (username) => {
  const [rows] = await db.execute(
    "SELECT id, username FROM users WHERE username = ?", // 비밀번호 제외
    [username]
  );
  return rows[0];
};
