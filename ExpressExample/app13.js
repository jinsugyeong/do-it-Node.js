/**
 *  multer 미들웨어 설치해서 파일 업로드하기 
 * !!!미들웨어 사용순서 주의하기(body-parser > multer > router)
 * 
 *  주요 속성과 메소드의 의미
 *  - destination: 업로드한 파일이 저장될 폴더 지정
 *  - filename: 업로드한 파일의 이름 
 *  - limits: 파일 크기나 파일 개수 등의 제한 속성을 설정하는 객체
 */
var express = require('express')
	, http = require('http')
	, path = require('path');

var bodyParser = require('body-parser')
	, cookieParser = require('cookie-parser')
	, static = require('serve-static')
	, errorHandler = require('errorhandler');

var expressErrorHandler = require('express-error-handler');
var expressSession = require('express-session');

//파일 업로드용 미들웨어
var multer = require('multer');
var fs = require('fs');

//클라이언트에서 ajax로 요청했을 때 CORS(다중 서버 접속) 지원
var cors = require('cors');

var app = express();
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));
app.use(cookieParser());
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));
app.use(cors());

//파일제한: 10개, 1GB
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, 'uploads')
	},
	filename: function(req, file, callback) {
		callback(null, file.originalname + Date.now())
	}
});
var upload = multer({
	storage: storage,
	limits: {
		files: 10,
		fileSize: 1024 * 1024 * 1024
	}
});

//라우터 사용하여 라우팅 함수 등록
var router = express.Router();

router.route('/process/photo').post(upload.array('photo', 1) ,function(req, res) {
	console.log('/process/photo 호출됨.');

	try {
		var files = req.file;

		console.log('#===== 업로드된 첫번째 파일 정보 ======#');
		console.log(req.files[0]);
		console.log('#======================================#');

		//현재 파일 정보를 저장할 변수 선언
		var originalname = '',
			filename = '',
			mimetype = '',
			size = 0;

		if(Array.isArray(files)) {	//배열에 들어가 있는 경우
			console.log('배열에 들어있는 파일 갯수 : %d', files.length);

			for(var i=0; i<files.length; i++) {
				originalname = files[i].originalname;
				filename = files[i].filename;
				mimetype = files[i].mimetype;
				size = files[i].size;
			}

		}else {	//배열에 들어가 있지 않은 경우
			console.log('파일 갯수 : 1');
			let myFile = req.files[0];

			originalname = myFile.originalname;
			filename = myFile.filename;
			mimetype = myFile.mimetype;
			size = myFile.size;
		}

		console.log('현재 파일 정보 : '+originalname+', '+filename+', '+mimetype+', '+size);

		//클라이언트에 응답 전송
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h3>파일 업로드 성공</h3>');
		res.write('<hr />');
		res.write('<p>원본 파일 이름 : ' + originalname + ' -> 저장 파일명 : '+ filename + '</p>');
		res.write('<p>MIME TYPE : ' + mimetype + '</p>');
		res.write('<p>파일 크기 : ' + size + '</p>');
		res.end();

	} catch (err) {
		console.dir(err.stack);
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