/**
 *  쿠키 처리하기
 *  :익스프레스에서는 cookie-parser 미들웨어를 사용
 */

//Express 기본 모듈 불러오기
var express = require('express')
    , http = require('http')
    , path = require('path');

//Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
    , static = require('serve-static');

var expressErrorHandler = require('express-error-handler');
var cookieParser = require('cookie-parser');

//익스프레스 객체 생성
var app = express();

//기본 속성 설정
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', static(path.join(__dirname, 'public')));
app.use(cookieParser());

//라우터 객체 참조
var router = express.Router();

// 라우팅 함수 등록1
router.route('/process/showCookie').get(function(req, res) {
	console.log('/process/showCookie 호출됨.');

	res.send(req.cookies);
});
// 라우팅 함수 등록2
router.route('/process/setUserCookie').get(function(req, res) {
	console.log('/process/setUserCookie 호출됨.');

	//쿠키 설정
	res.cookie('user', {
		id: 'jsg',
		name: '진수경',
		authorized: true
	});

	//redirectf로 응답
	res.redirect('/process/showCookie');

	res.send(req.cookies);
});

//라우터 객체를 app 객체에 등록
app.use('/', router);

//모든 router 처리 끝난 후 404 오류 페이지 처리
var errorHandler = expressErrorHandler({
	static: {
		'404': './public/404.html'
	}
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


//Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});