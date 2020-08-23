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

const { check, validationResult } = require("express-validator");

/* hello/add/でのGET処理 */
router.get("/add", (req, res, next) => {
  var data = {
    title: "Hello/Add",
    content: "新しいレコードを入力：",
    form: { name: "", mail: "", age: 0 },
  };
  res.render("hello/add", data);
});

/* hello/add/でのPOST処理 */
router.post(
  "/add",
  [
    // check(項目名, エラーメッセージ).メソッド()
    check("name", "NAME は必ず入力して下さい。").notEmpty().escape(),
    check("mail", "MAIL はメールアドレスを記入して下さい。").isEmail().escape(),
    check("age", "AGE は年齢（整数）を入力下さい。").isInt(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      var result = '<ul class="text-danger">';
      var result_arr = errors.array();

      for (var n in result_arr) {
        result += "<li>" + result_arr[n].msg + "</li>";
      }
      result += "</ul>";

      var data = {
        title: "Hello/Add",
        content: result,
        form: req.body,
      };

      res.render("hello/add", data);
    } else {
      var nm = req.body.name;
      var ml = req.body.mail;
      var ag = req.body.age;
      db.serialize(() => {
        db.run(
          "insert into mydata (name, mail, age) values (?, ?, ?)",
          nm,
          ml,
          ag
        );
      });
      res.redirect("/hello");
    }
  }
);

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

/* hello/delete/でのPOST処理 */
router.post("/delete", (req, res, next) => {
  const id = req.body.id;
  db.serialize(() => {
    //レコードの削除はdelete文を使う。where句がないと全てのレコードが削除されてしまうので注意。
    db.run("delete from mydata where id = ?", id);
  });

  res.redirect("/hello"); //削除したら一覧ページに戻す。
});

/* hello/find/でのGET処理 */
router.get("/find", (req, res, next) => {
  db.serialize(() => {
    db.all("select * from mydata", (err, rows) => {
      if (!err) {
        var data = {
          title: "Hello/find",
          find: "",
          content: "検索条件を入力して下さい。",
          mydata: rows,
        };
        res.render("hello/find", data);
      }
    });
  });
});

/* hello/find/でのPOST処理 */
router.post("/find", (req, res, next) => {
  var find = req.body.find;

  db.serialize(() => {
    db.all("select * from mydata where " + find, [], (err, rows) => {
      if (!err) {
        var data = {
          title: "Hello/find",
          find: find,
          content: "検索条件 " + find,
          mydata: rows,
        };
        res.render("hello/find", data);
      }
    });
  });
});

module.exports = router;
