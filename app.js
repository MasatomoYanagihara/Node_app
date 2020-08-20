const http = require("http");
const fs = require("fs"); //fsモジュールをロード

var server = http.createServer((request, response) => {
  /*
  ファイルを読み込んでいる。
  fs.readFile(ファイル名, エンコーディング, readが完了した後に実行する関数(コールバック関数))
   */
  fs.readFile("./index.html", "UTF-8", (error, data) => {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
});

server.listen(3000);
console.log("Server start!");
