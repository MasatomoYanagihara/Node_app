const http = require("http");
const fs = require("fs");
const ejs = require("ejs"); //ejsモジュールをロード

/*
fs.readFileSync( ファイル, エンコーディング)でファイル読み込み(Syncは同期処理)
サーバーが起動する前なので同期処理でもよいという考え。立ち上がりが遅くなるだけ。
*/
const index_page = fs.readFileSync("./index.ejs", "utf8");

var server = http.createServer(getFromClient);

server.listen(3000);
console.log("Server start!");


function getFromClient(request, response) {

  /* ejs.render()でレンダリング */
  var content = ejs.render(index_page);

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(content);
  response.end();
}
