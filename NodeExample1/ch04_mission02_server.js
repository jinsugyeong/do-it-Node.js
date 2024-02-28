/**
 * 1. 노드의 소켓 기능을 이용해 소켓 서버와 소켓 클라이언트 만들기
 * 2. 소켓 클라이언트에서 소켓 서버로 연결
 * 3. 소켓 클라이언트에서 소켓 서버로 '안녕!'같은 글자를 보내면 소켓 서버에서 그 글자를 그대로 다시 소켓 클라이언트로 보내기
 * 4. 소켓 클라이언트와 소켓 서버에서 받은 데이터를 화면에 출력하기
 */

var net = require('net');

//소켓 서버 생성
var server = net.createServer(function(socket) {
    socket.setEncoding('utf8'); 
    // 연결된 클라이언트 정보 확인
    socket.name = socket.remoteAddress + ":" + socket.remotePort;
    //console.log('클라이언트 연결됨 -> ' + socket.name); 

    // 클라이언트로부터 메시지를 받았을 때 발생하는 이벤트
    socket.on('data', function (data) {
        console.log('클라이언트로부터 받은 데이터 : ' + data);
        
        // 받은 메시지를 돌려줌
        socket.write('하이룽지렁이빨대나무' + ' from server.');
    });

    // 클라이언트 연결이 끊어진 경우
    socket.on('end', function(){
        //console.log('클라이언트로부터 연결 끊어짐 -> ' + socket.name);
    });
});

// 소켓 서버 실행
var port = 3000;
server.listen(port);

console.log('소켓 서버 실행됨 : ' + port);