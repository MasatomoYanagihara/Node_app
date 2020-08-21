const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const url = require("url");
const qs = require("querystring"); //queryモジュールをロード

const index_page = fs.readFileSync("./index.ejs", "utf8");
const other_page = fs.readFileSync("./other.ejs", "utf8");

var server = http.createServer(getFromClient);

server.listen(3000);
console.log("Server start!");

function getFromClient(request, response) {
  var url_parts = url.parse(request.url, true);

  switch (url_parts.pathname) {
    case "/":
      response_index(request, response);
      break;

    case "/other":
      response_other(request, response);
      break;

    default:
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end("no page...");
      break;
  }
}

/* 繰り返し表示用のデータを用意 */

var data = {
  Taro: "09-999-999",
  Hanako: "080-888-888",
  Sachiko: "070-777-777",
  Ichiro: "060-666-666",
};

// indexのアクセス処理
function response_index(request, response) {
  var msg = "これはIndexページです。";
  var content = ejs.render(index_page, {
    title: "Index",
    content: msg,
    data: data,
    filename: 'data_item' //パーシャルファイルを指定
  });
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(content);
  response.end();
}

/* Otherのアクセス処理 */
function response_other(request, response) {
  var msg = "これはOtherページです。";

  /* POSTアクセス時の処理 */
  if (request.method == "POST") {
    var body = "";

    /* データ受信のイベント(data) */
    request.on("data", (getdata) => {
      body += getdata;
    });

    /* データ受信終了のイベント(end)処理 */
    request.on("end", () => {
      var post_data = qs.parse(body);
      msg += "あなたは、「" + post_data.msg + "」と書きました。";
      var content = ejs.render(other_page, {
        title: "Other",
        content: msg,
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(content);
      response.end();
    });
  } else {
    /* GETアクセス時の処理 */
    var msg = "ページがありません。";
    var content = ejs.render(other_page, {
      title: "Other",
      content: msg,
    });
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(content);
    response.end();
  }
}
