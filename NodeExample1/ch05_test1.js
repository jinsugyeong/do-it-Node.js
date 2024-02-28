var http = require('http');

//웹서버 객체
var server = http.createServer();

//웹 서버를 시작하여 3000번 포트에서 대기
var port = 3000;
//이더넷 카드가 여러개 있을경우 특정IP를 지정하여 서버 실행 가능
var host = 'localhost';

server.listen(port, host, function(){
    console.log('웹 서버가 시작되었습니다. ', port);
})