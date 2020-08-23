const express = require("express");
const router = express.Router();
const db = require("../models/index"); //Sequelizeで利用される全ての情報が入っている。
const { Op } = require("sequelize"); //Operatorオブジェクトをロード

/* GET users listing. */
router.get("/", (req, res, next) => {
  const id = req.query.id;
  db.User.findAll({
    where: {
      id: { [Op.lte]: id } //lte(less than/equal)は以下
      // id: { [Op.gte]: id } gte(greater than/equal)は以上
      // id: { [Op.lt]: id } lt(less than)は未満
      // id: { [Op.lt]: id } lt(less than)は超える
    },
  }).then((usrs) => {
    var data = {
      title: "Users/Index",
      content: usrs,
    };
    res.render("users/index", data);
  });
});

module.exports = router;
