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

module.exports = router;
