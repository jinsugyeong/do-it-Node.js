/**
 *  토큰과 함께 요청한 정보 처리하기
 */

//Express 기본 모듈 불러오기
var express = require('express')
    , http = require('http')
    , path = require('path');

//Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
    , static = require('serve-static');

//오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

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
router.route('/process/users/:id').get(function(req, res) {
	console.log('/process/users/:id 처리함.');

	//URL 파라미터 확인
	var paramId = req.body.id || req.query.id;
	
	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
	res.write('<div><p>Param id : ' + paramId + '</p></div>');
	res.end();
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