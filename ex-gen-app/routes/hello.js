const express = require("express");
const router = express.Router();

const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("mydb.sqlite3");

router.get("/", (req, res, next) => {

  db.serialize(() => {

    db.all("select * from mydata", (err, rows) => {
      // データベースアクセス完了時の処理
      if (!err) {
        var data = {
          title: "Hello!",
          content: rows, // 取得したレコードデータ
        };
        res.render("hello/index", data);
      }
    });
  });
});

/* hello/add/でのGET処理 */
router.get("/add", (req, res, next) => {
  var data = {
    title: "Hello/Add",
    content: "新しいレコードを入力:",
  };
  res.render("hello/add", data);
});

/* hello/add/でのPOST処理 */
router.post("/add", (req, res, next) => {
  const nm = req.body.name;
  const ml = req.body.mail;
  const ag = req.body.age;

  db.serialize(() => {
    db.run("insert into mydata (name, mail, age) values (?, ?, ?)", nm, ml, ag);
  });
  res.redirect("/hello");
});

/* hello/show/でのGET処理 */
router.get("/show", (req, res, next) => {
  const id = req.query.id; //idを取り出している

  db.serialize(() => {
    // db.get()は一件だけ取り出す
    db.get("select * from mydata where id = ?", [id], (err, row) => {
      if (!err) {
        var data = {
          title: "Hello/show",
          content: "id = " + id + " のレコード：",
          mydata: row,
        };

        res.render("hello/show", data);
      }
    });
  });
});

module.exports = router;
