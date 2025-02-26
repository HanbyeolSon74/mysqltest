import express from "express";
import path from "path";
import visitorRouter from "./routers/visitorRouter.js";
import Visitor from "./models/visitorModel.js";

const app = express();
const SERVER_PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));
app.use("/visitor", visitorRouter);

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(SERVER_PORT, () => {
  console.log(`서버가 실행 중입니다. 포트: ${SERVER_PORT}`);
});
