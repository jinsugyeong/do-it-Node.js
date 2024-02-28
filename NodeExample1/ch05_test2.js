/**
 *  클라이언트가 웹 서버에 요청할 때 발생하는 이벤트 처리하기
 * 
 *  - connection : 클라이언트가 접속하여 연결이 만들어질 때 발생하는 이벤트
 *  - request : 클라이언트가 요청할 때 발생하는 이벤트
 *  - close : 서버를 종료할 때 발생하는 이벤트
 */
var http = require('http');
var server = http.createServer();
var port = 3000;
server.listen(port, function(){
    console.log('웹 서버가 시작되었습니다. ', port);
})

//클라이언트 연결 이벤트
server.on('connect', function(socket) {
    var addr = socket.address();
    console.log('클라이언트가 접속했습니다. : ', addr.address, addr.port);
});

//클라이언트 요청 이벤트
server.on('request', function(req, res) {
    console.log('클라이언트 요청이 들어왔습니다.');
    console.log(req);
});

//서버 종료 이벤트
server.on('close', function() {
    console.log('서버가 종료되었습니다.');
});