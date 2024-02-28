/**
 *  Express의 요청 객체와 응답 객체
 * 
 *  - send([body]) : 클라이언트에 응답 데이터를 보냄, 전달할 수 있는 데이터는 HTML,문자열,Buffer객체,JSON객체 및 배열
 *  - status(code) : HTTP 상태 코드를 반환함, 상태코드는 end나 send같은 전송 메소드를 추가로 호출해야 전송가능
 *  - sendStatus(statusCode) : HTTP 상태 코드 반환함, 상태 코드는 상태 메시지와 함께 전송됨
 *  - rediredct([status,] path) : 웹페이지 경로를 강제로 이동시킴
 *  - render(view [,locals][,callback]) : 뷰 엔진을 사용해 문서를 만든 후 전송함
 */
var express = require('express');
var http = require('http');
var app = express();

app.use(function(req, res, next) {
    console.log('첫 번째 미들웨어에서 요청을 처리함.');
    res.send({name:'진수경', age:25});
});

app.use(function(req, res, next) {
    console.log('두 번째 미들웨어에서 요청을 처리함.');

    res.writeHead('200', {'content-Type':'text/html; charset=utf8'});
    res.end('<h1>Express 서버에서'+ req.user +'가 응답한 결과입니다.</h1>');
});

http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨.');
});