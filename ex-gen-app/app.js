/* 必要なモジュールのロード */
var createError = require("http-errors"); //HTTPエラーの対処を行う為のもの
var express = require("express"); //Express本体
var path = require("path"); //ファイルパスを扱う為のもの
var cookieParser = require("cookie-parser"); //クッキーのパースに関するもの
var logger = require("morgan"); //HTTPリクエストのログ出力に関するもの

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

/* アクセスするルート設定 */
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/hello", helloRouter);

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
