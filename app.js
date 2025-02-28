import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import db from "./config/db.js";
import authRouter from "./routers/authRouter.js";

const app = express();
const PORT = process.env.PORT || 4000;

// 미들웨어 설정
app.use(express.json()); // JSON 파싱 미들웨어
app.use(cookieParser()); // 쿠키 파서 미들웨어
app.use(express.static(path.join(process.cwd(), "public"))); // 정적 파일 제공

// EJS 템플릿 엔진 설정
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

// 라우터 등록
app.use("/auth", authRouter);

// 기본 페이지 설정
app.get("/", (req, res) => res.render("index"));
app.get("/login", (req, res) => res.render("login"));

// /welcome 경로 처리 추가
app.get("/welcome", (req, res) => {
  const username = req.query.username;
  if (username) {
    res.render("welcome", { username });
  } else {
    res.redirect("/login"); // 만약 username이 없으면 로그인 페이지로 리디렉션
  }
});

// 데이터베이스 연결 후 서버 실행
db.sync().then(() => {
  console.log("데이터베이스 연결 완료");
  app.listen(PORT, () => console.log(`서버 실행 중: http://localhost:${PORT}`));
});
