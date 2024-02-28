/**
 *  Express에서 요청 객체에 추가한 헤더와 파라미터 알아보기
 *  - query : 클라이언트에서 GET 방식으로 전송한 요청 파라미터 확인
 *  - body  : 클라이언트에서 POST방식으로 전송한 요청 파라미터 확인 
 *            단, body-parser와 같은 외장 모듈 사용해야함
 *  - header(name) : 헤더 확인
 */

var express = require('express');
var http = require('http');
var app = express();

app.use(function(req, res, next) {
    console.log('첫 번째 미들웨어에서 요청을 처리함.');

    var userAgent = req.header('User-Agent');
    var paramName = req.query.name;

    res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>User-Agent : '+ userAgent +'</p></div>');
    res.write('<div><p>Param name : '+ paramName +'</p></div>');
    res.end();
});

app.use(function(req, res, next) {
    console.log('두 번째 미들웨어에서 요청을 처리함.');

    res.writeHead('200', {'content-Type':'text/html; charset=utf8'});
    res.end('<h1>Express 서버에서'+ req.user +'가 응답한 결과입니다.</h1>');
});

http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨.');
});