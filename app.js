import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import visitorRouter from "./routers/visitorRouter.js";
import authRouter from "./routers/authRouter.js";

const app = express();
const SERVER_PORT = process.env.PORT || 4000;

// 미들웨어 설정
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), "public")));

// 뷰 엔진 설정
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

// 라우트 설정
app.use("/visitor", visitorRouter);
app.use("/auth", authRouter); // 인증 관련 라우트 추가

// 페이지 렌더링
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("Login");
});

app.get("*", (req, res) => {
  res.render("404");
});

// 서버 실행
app.listen(SERVER_PORT, () => {
  console.log(`서버가 실행 중입니다. 포트: ${SERVER_PORT}`);
});
