/**
 *  세션 처리하기
 *  : 쿠키와 달리 서버쪽에 저장됨. express-session 모듈 사용.
 * 
 *  과정...
 *  1. 사용자가 상품정보를(/process/product) 웹서버에게 요청함
 *  2. 웹서버는 라우팅 처리중 user 세션이 있는지 확인하고
 *  2-1. 있으면 상품정보를(/public/product.html) 보여주고
 *  2-2. 없으면 로그인해야(redirect /public/login2.html) 볼수있다고 응답함
 */


var express = require('express')
	, http = require('http')
	, path = require('path');

var bodyParser = require('body-parser')
	, cookieParser = require('cookie-parser')
	, static = require('serve-static');

var expressErrorHandler = require('express-error-handler');
var expressSession = require('express-session');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));

var router = express.Router();



//로그인 라우팅 함수 - 로그인 후 세션 저장함
router.route('/process/login').post(function(req, res) {
	console.log('/process/login 호출됨.');

	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;

	if(req.session.user){	
		//이미 로그인된 상태
		console.log('이미 로그인되어 상품 페이지로 이동합니다.')
		res.redirect('/public/product.html');
	}else {			
		//세션 저장		
		req.session.user = {
			id: paramId,
			name: '개발바라',
			authorized: true
		};

		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h1>로그인 성공</h1>');
		res.write('<div><p>Param id : ' + paramId + '</p></div>');
		res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
		res.write("<br><br><a href='/process/product'>상품 페이지로 이동하기</a>");
		res.end();
	}
});

//로그아웃 라우팅 함수 - 로그아웃 후 세션 삭제함
router.route('/process/logout').get(function(req, res) {
	console.log('/process/logout 호출됨.');

	if(req.session.user){	
		//로그인된 상태
		console.log('로그아웃합니다.');

		req.session.destroy(function(err){
			if(err) throw err;
			console.log('세션을 삭제하고 로그아웃 되었습니다.');
			res.redirect('/public/login2.html');
		});
		
	}else {			
		//로그인 안 된 상태	
		console.log('아직 로그인되어 있지 않습니다.');
		res.redirect('/public/login2.html');
	}
});

//상품정보 라우팅 함수
router.route('/process/product').get(function(req, res) {
	console.log('/process/product 호출됨.');

	if(req.session.user){
		res.redirect('/public/product.html');
	}else {
		res.redirect('/public/login2.html');
	}
});

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