import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import db from "./config/db.js";
import authRouter from "./routers/authRouter.js";

const app = express();
const PORT = process.env.PORT || 4000;

// 미들웨어 설정
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), "public")));

// EJS 템플릿 엔진 설정
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

// 라우터 등록
app.use("/auth", authRouter);

// 기본 페이지 설정
app.get("/", (req, res) => res.render("index"));
app.get("/login", (req, res) => res.render("login"));

// 로그인 후 이동할 welcome 페이지 라우트
app.get("/welcome", (req, res) => {
  const username = req.query.username; // 쿼리스트링으로 전달된 username 가져오기
  if (username) {
    res.render("welcome", { username });
  } else {
    res.redirect("/login");
  }
});

// 데이터베이스 연결 후 서버 실행
db.sync().then(() => {
  console.log("데이터베이스 연결 완료");
  app.listen(PORT, () => console.log(`서버 실행 중: http://localhost:${PORT}`));
});
