import express from "express";
import { login, register, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

// 회원가입 페이지 렌더링
router.get("/register", (req, res) => {
  res.render("register"); // register.ejs 파일을 렌더링
});

export default router;
