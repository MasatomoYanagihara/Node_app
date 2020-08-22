var express = require("express");
var router = express.Router();

/* GET home page. */
/* 第１引数は"/hello"ではなく"/"となる。"/"は/hello/という意味。ルーティングはapp.jsでしている。 */
router.get("/", function (req, res, next) {
  var data = {
    title: "Hello!",
    content: "＊何か書いて送信してください。"
  };

  res.render("hello", data);
});

router.post('/post', (req, res, next) => {
  var msg = req.body["message"];
  var data = {
    title: "Hello",
    content: "あなたは、「" + msg + "」と送信しました。"
  }

  res.render('hello', data)
})

module.exports = router;
