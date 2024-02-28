//라우터 : 클라이언트의 요청 패스를 보고 이 요청 정보를 처리할 수 있는 곳으로 기능을 전달해 주는 역할
var express = require('express');
var http = require('http');
var app = express();

app.use(function(req, res, next) {
    console.log('첫 번째 미들웨어에서 요청을 처리함.');

    res.writeHead('200', {'content-Type':'text/html; charset=utf8'});
    res.end('<h1>Express 서버에 응답한 결과입니다.</h1>');
});

http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨.');
});