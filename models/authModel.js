import db from "../config/db.js";

// 아이디로 사용자 정보 조회
export const getUserByUsername = async (username) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  return rows[0]; // 사용자 정보 반환
};

// 사용자의 토큰을 DB에 저장하는 함수 (선택적)
export const saveToken = async (userId, token) => {
  await db.execute("INSERT INTO tokens (user_id, token) VALUES (?, ?)", [
    userId,
    token,
  ]);
};
