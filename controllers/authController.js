import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js"; // default로 가져오기

// 🔹 로그인 처리
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

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600 * 1000, // 1시간
    });

    res.json({ message: "로그인 성공", username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류" });
  }
};

// 🔹 회원가입 처리
export const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    // 아이디 중복 체크
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "이미 존재하는 아이디입니다." });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새 사용자 생성
    const newUser = await User.create({
      name, // 이름 추가
      username,
      password: hashedPassword,
    });

    res.status(201).json({ message: "회원가입 성공" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류" });
  }
};

// 🔹 로그아웃 처리
export const logout = (req, res) => {
  res.clearCookie("token"); // 쿠키에서 JWT 토큰 제거
  res.json({ message: "로그아웃 성공" });
};
