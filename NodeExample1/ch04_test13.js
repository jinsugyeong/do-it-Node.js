//http 모듈로 요청받은 파일 내용을 읽고 응답하기

var fs = require('fs');
var http = require('http');
var server = http.createServer(function(req, res) {
    //파일을 읽어 응답 스트림과 pipe로 연결
    //파일에서 데이터를 읽어오기 위해 만든것 = 데이터를 쓰기 위해 웹 서버에서 클라이언트 쪽에 만든 것 
    var instream = fs.createReadStream('../ouput.txt');
    instream.pipe(res);
});

server.listen(7001, '127.0.0.1');