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
  response.end("Hello World!");
});

/* サーバーを待ち受け状態にする */
server.listen(3000);
