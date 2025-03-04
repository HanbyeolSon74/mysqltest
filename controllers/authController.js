import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "아이디 또는 비밀번호가 틀렸습니다." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "아이디 또는 비밀번호가 틀렸습니다." });
    }

    // JWT 생성
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );

    // HTTP-Only 쿠키에 토큰 저장
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // 배포 환경에서는 true
      sameSite: "Strict", // CSRF 방지
      maxAge: 3600 * 1000, // 1시간 유지
    });

    res.json({ message: "로그인 성공", username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류" });
  }
};

// 회원가입 처리
export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 중복 아이디 체크
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "이미 존재하는 아이디입니다." });
    }

    // 새 사용자 생성 (비밀번호 해싱은 모델의 `beforeCreate` 훅에서 처리됨)
    await User.create({ username, password });

    res.status(201).json({ message: "회원가입 성공" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류" });
  }
};

// 로그아웃 처리
export const logout = (req, res) => {
  console.log("로그아웃 요청 받음");
  res.clearCookie("token"); // 쿠키에서 JWT 토큰 제거
  res.json({ message: "로그아웃 성공" });
};
