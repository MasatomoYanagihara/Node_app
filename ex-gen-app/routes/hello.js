var express = require("express");
var router = express.Router();

/* GET home page. */
/* 第１引数は"/hello"ではなく"/"となる。"/"は/hello/という意味。ルーティングはapp.jsでしている。 */
router.get("/", function (req, res, next) {

  /* queryを取り出している。 */ 
  var name = req.query.name;
  var mail = req.query.mail;

  var data = {
    title: "Hello!",
    content:
      "あなたの名前は、" + name + "。<br>" +
      "メールアドレスは、" + mail + "です。",
  };

  res.render("hello", data);
});

module.exports = router;
