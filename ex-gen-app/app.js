/* 必要なモジュールのロード */
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");

/* Expressオブジェクトの作成 */
var app = express();

/* Expressオブジェクトの設定 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/* 関数組み込み */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* ルート用モジュールのロード */
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var helloRouter = require("./routes/hello");
var apiRouter = require("./routes/api");
var boardsRouter = require("./routes/boards");
var marksRouter = require("./routes/marks");

/* セッション利用の為の処理 */
var session_opt = {
  secret: "keyboard dog", //秘密キーとなるテキスト
  resave: false, //セッションストアと呼ばれるところに強制的に値を保存する
  saveUninitialized: false, //初期化されていない値を強制的に保存する
  cookie: { maxAge: 60 * 60 * 1000 }, //Cookieの保管時間を設定。（１時間に設定。）
};
app.use(session(session_opt));

/* アクセスするルート設定 */
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/hello", helloRouter);
app.use("/api", apiRouter);
app.use("/boards", boardsRouter);
app.use("/md", marksRouter);

/* エラー用のapp.use作成 */
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

/* module.expressの設定 */
module.exports = app;
