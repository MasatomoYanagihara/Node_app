/*
Hello Worldを出力するプログラム
localhost:3000で起動している。
3000番ポートはNode.jsでデフォルトで使われている。
*/

/* httpモジュールをロード */
const http = require("http");

/*
serverオブジェクトを作成
createServerではrequestとresponseの二つの引数を必ず用意する。
*/
var server = http.createServer((request, response) => {
  /* ResponseHeadersのContent-Typeをtext/htmlにする */
  response.setHeader("Content-Type", "text/html");

  response.write('<!DOCTYPE html></html lang="ja">');
  response.write('<head><meta charset="utf-8">');
  response.write("<titile>Hello</title></head>");
  response.write("<body><h1>Hello Node.js</h1>");
  response.write("<p>This is Node.js sample page.</p>");
  response.write("<p>これは、Node.jsのサンプルページです。</p>", "utf-8");
  response.write("</body></html>");
  response.end();
});

/* サーバーを待ち受け状態にする */
server.listen(3000);
console.log("Server start!");
