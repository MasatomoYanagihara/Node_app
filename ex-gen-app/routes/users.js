const express = require("express");
const router = express.Router();
const db = require("../models/index"); //Sequelizeで利用される全ての情報が入っている。

/* GET users listing. */
router.get("/", (req, res, next) => {

  //db.Userでuserモデルにアクセス。findAll()で全レコード取得。そのデータがusrsに渡る。（非同期処理）
  db.User.findAll().then((usrs) => {
    var data = {
      title: "User/Index",
      content: usrs,
    };
    res.render("users/index", data);
  });
});

module.exports = router;
