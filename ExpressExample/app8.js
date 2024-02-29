/**
 *  라우터 미들웨어 사용하기
 *  :익스프레스에 포함되어 있음. 사용자가 요청한 기능이 무엇인지 패스를 기준으로 구별함.
 * 
 *  메소드
 *  - get(callback) : GET 방식으로 특정 패스 요청이 발생했을 때 사용할 콜백 함수 지정
 *  - post(callback) : POST 방식으로 ""
 *  - put(callback) : PUT 방식으로  ""
 *  - delete(callback) : DELETE 방식으로 "" 
 *  - all(callback) : 모든 요청 방식을 처리하며, ""
 */

//Express 기본 모듈 불러오기
var express = require('express')
    , http = require('http')
    , path = require('path');

//Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
    , static = require('serve-static');

//익스프레스 객체 생성
var app = express();

//기본 속성 설정
app.set('port', process.env.PORT || 3000);

//body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }))

//body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())

app.use('/public', static(path.join(__dirname, 'public')));


//라우터 객체 참조
var router = express.Router();

// 라우팅 함수 등록
router.route('/process/login').post(function(req, res) {
	console.log('/process/login 처리함.');

	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;
	
	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
	res.write('<div><p>Param id : ' + paramId + '</p></div>');
	res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
	res.write("<br><br><a href='/public/login2.html'>로그인 페이지로 돌아가기</a>");
	res.end();
});

//라우터 객체를 app 객체에 등록
app.use('/', router);


//등록되지 않은 패스에 대해 페이지 오류 응답
app.all('*', function(req, res) {
	res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
});


//Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});