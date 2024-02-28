/**
 * MIME Type
 * 
 * text/plain 일반텍스트 문서
 * text/html HTML 문서
 * text/css CSS 문서
 * image/jpeg,image/png JPEG,PNG 파일
 * video/mpeg,audio/mp3 MPEG비디오,MP3음악 파일
 * appllication/zip ZIP 압축 파일
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
    fs.readFile(filename, function(err, data){
        res.writeHead(200, {"Content-Type":"image/jpg"});
        res.write(data);
        res.end();
    });
});