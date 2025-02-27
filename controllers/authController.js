import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../config/db.js"; // DB 연결

// 로그인 함수
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 사용자 찾기
    const [user] = await db.execute("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (user.length === 0) {
      return res
        .status(401)
        .json({ message: "아이디 또는 비밀번호가 틀렸습니다." });
    }

    // 저장된 비밀번호와 입력된 비밀번호 비교
    const isMatch = await bcrypt.compare(password, user[0].password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "아이디 또는 비밀번호가 틀렸습니다." });
    }

    // JWT 토큰 발급
    const token = jwt.sign({ userId: user[0].id }, "your_secret_key", {
      expiresIn: "1h",
    });

    // JWT 토큰을 쿠키에 저장
    res.cookie("token", token, {
      httpOnly: true, // JavaScript에서 접근할 수 없도록 설정
      secure: process.env.NODE_ENV === "production", // HTTPS에서만 쿠키 사용
      maxAge: 3600 * 1000, // 1시간
    });

    // 로그인 성공 응답
    res.status(200).json({ message: "로그인 성공" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류" });
  }
};
