import express from "express";
import { login, register, logout } from "../controllers/authController.js";

const router = express.Router();

// 로그인
router.post("/login", login);

// 회원가입
router.get("/register", (req, res) => {
  res.render("register"); // 'register.ejs' 파일을 렌더링합니다.
});

// 로그아웃
router.post("/logout", logout);

// 로그인 페이지
router.get("/welcome", (req, res) => {
  res.render("welcome", { username: req.cookies.username || "사용자" });
});

export default router;
