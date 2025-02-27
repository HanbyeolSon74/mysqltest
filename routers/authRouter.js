import express from "express";
import { login } from "../controllers/authController.js"; // authController에서 login 임포트
import jwt from "jsonwebtoken";
import { promisify } from "util";

const router = express.Router();

// 로그인 처리
router.post("/login", login);

// 인증이 필요한 라우트
router.get("/profile", async (req, res) => {
  const token = req.cookies.token; // 쿠키에서 토큰을 추출

  if (!token) {
    return res.status(403).json({ message: "로그인 필요" });
  }

  try {
    // JWT 토큰 검증
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET || "your_secret_key"
    );
    // 인증된 사용자 정보
    res.json({ message: "프로필 페이지", user: decoded });
  } catch (err) {
    return res.status(403).json({ message: "유효하지 않은 토큰" });
  }
});

export default router;
