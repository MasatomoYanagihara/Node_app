const express = require("express");
const router = express.Router();
const db = require("../models/index"); //Sequelizeで利用される全ての情報が入っている。
const { Op } = require("sequelize"); //Operatorオブジェクトをロード

/* GET users listing. */
router.get("/", (req, res, next) => {
  const id = req.query.id;
  db.User.findAll().then((usrs) => {
    var data = {
      title: "Users/Index",
      content: usrs,
    };
    res.render("users/index", data);
  });
});

/* users/add/でのGET処理 */
router.get("/add", (req, res, next) => {
  var data = {
    title: "Users/Add",
  };
  res.render("users/add", data);
});

/* users/add/でのPOST処理 */
router.post("/add", (req, res, next) => {
  db.sequelize
    .sync()
    .then(() =>
      db.User.create({
        name: req.body.name,
        pass: req.body.pass,
        mail: req.body.mail,
        age: req.body.age,
      })
    )
    .then((usr) => {
      res.redirect("/users");
    });
});

/* users/login/でのGET処理 */
router.get("/login", (req, res, next) => {
  var data = {
    title: "Users/Login",
    content: "名前とパスワードを入力下さい。",
  };
  res.render("users/login", data);
});

/* users/login/でのPOST処理 */
router.post("/login", (req, res, next) => {

  // １つのレコードだけを取得するメソッド。
  db.User.findOne({
    where: {
      name: req.body.name,
      pass: req.body.pass,
    },
  }).then((usr) => {
    // 送信したフォームのnameとpassが一致するUserが存在するか確認。
    if (usr != null) {
      req.session.login = usr;
      let back = req.session.back;
      if (back == null) {
        back = "/";
      }
      res.redirect(back);
    } else {
      var data = {
        title: "Users/Login",
        content: "名前かパスワードに問題があります。再度入力下さい。",
      };
      res.render("users/login", data);
    }
  });
});

module.exports = router;
