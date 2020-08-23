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
  const id = req.query.id;

  db.serialize(() => {
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

/* hello/edit/でのGET処理 */
router.get("/edit", (req, res, next) => {
  const id = req.query.id;

  db.serialize(() => {
    db.get("select * from mydata where id = ?", [id], (err, row) => {
      if (!err) {
        var data = {
          title: "hello/edit",
          content: "id = " + id + " のレコードを編集：",
          mydata: row,
        };
        res.render("hello/edit", data);
      }
    });
  });
});

/* hello/edit/でのPOST処理 */
router.post("/edit", (req, res, next) => {
  const id = req.body.id;
  const nm = req.body.name;
  const ml = req.body.mail;
  const ag = req.body.age;

  db.serialize(() => {
    db.run(
      //レコードの更新はupdate文を使う。where句がないと全てのレコードが更新されてしまうので注意。
      "update mydata set name = ?, mail = ?, age = ? where id = ?",
      nm,
      ml,
      ag,
      id
    );
  });

  res.redirect("/hello"); //編集したら一覧ページに戻す。
});

/* hello/delete/でのGET処理 */
router.get("/delete", (req, res, next) => {
  const id = req.query.id;

  db.serialize(() => {
    //select文で削除するレコードをidで指定する。
    db.get("select * from mydata where id = ?", [id], (err, row) => {
      if (!err) {
        var data = {
          title: "Hello/Delete",
          content: "id = " + id + " のレコードを削除：",
          mydata: row,
        };
        res.render("hello/delete", data);
      }
    });
  });
});

router.post("/delete", (req, res, next) => {
  const id = req.body.id;
  db.serialize(() => {
    //レコードの削除はdelete文を使う。where句がないと全てのレコードが削除されてしまうので注意。
    db.run("delete from mydata where id = ?", id);
  });

  res.redirect("/hello"); //削除したら一覧ページに戻す。
});

module.exports = router;
