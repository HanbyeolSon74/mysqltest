const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const visitorRouter = require("./routers/visitorRouter");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/visitor", visitorRouter);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(port, () => {
  console.log(`서버가 실행 중입니다. 포트: ${port}`);
});
