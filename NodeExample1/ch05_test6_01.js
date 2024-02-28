/**
 *  파일을 스트림으로 읽어 응답 보내기
 * 
 *  파일을 스트림 객체로 읽어 들인 후
 *  pipe 메소드로 응답 객체와 연결하면
 *  별다른 코드 없이도 파일에 응답을 보낼 수 있다
 */
var http = require('http');
var fs = require('fs');

var server = http.createServer();
var port = 3000;
server.listen(port, function(){
    console.log('웹 서버가 시작되었습니다. ', port);
})

//클라이언트 요청 이벤트
server.on('request', function(req, res) {
    console.log('클라이언트 요청이 들어왔습니다.');

    var filename = '../book.jpg';
    var infile = fs.createReadStream(filename, {flags: 'r'});

    //파이프로 연결하여 알아서 처리하도록 설정하기
    infile.pipe(res);
});