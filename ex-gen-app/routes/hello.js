var express = require("express");
var router = express.Router();

/* GET home page. */
/* 第１引数は"/hello"ではなく"/"となる。"/"は/hello/という意味。ルーティングはapp.jsでしている。 */
router.get("/", function (req, res, next) {
  var msg = "＊何か書いて送信してください。";
  if (req.session.message != undefined) {
    msg = "Last Message: " + req.session.message; //セッションから値を取り出している処理
  }

  var data = {
    title: "Hello!",
    content: msg
  };

  res.render("hello", data);
});

router.post('/post', (req, res, next) => {
  var msg = req.body["message"];
  req.session.message = msg; //セッションに保存している処理

  var data = {
    title: "Hello",
    content: "あなたは、「" + msg + "」と送信しました。"
  }

  res.render('hello', data)
})

module.exports = router;
