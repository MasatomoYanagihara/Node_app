var express = require("express");
var router = express.Router();

/* api/でのGET処理 */
router.get("/", function (req, res, next) {
  var param = { キー: "バリュー" };
  res.header("Content-Type", "application/json; charset=utf-8");
  res.send(param);
});

/* api/hello/でのGET処理 */
router.get("/hello", function (req, res, next) {
  var param = { result: "Hello World !" };
  res.header("Content-Type", "application/json; charset=utf-8");
  res.send(param);
});

module.exports = router;
