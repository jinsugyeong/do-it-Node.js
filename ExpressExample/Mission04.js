var express = require('express')
	, http = require('http')
	, path = require('path');

var bodyParser = require('body-parser')
	, static = require('serve-static')
    , expressErrorHandler = require('express-error-handler');

//파일 업로드용 미들웨어
var fs = require('fs');
var multer = require('multer');

//클라이언트에서 ajax로 요청했을 때 CORS(다중 서버 접속) 지원
var cors = require('cors');

var app = express();
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));
app.use(cors());

//파일제한: 10개, 1GB
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, 'uploads')
	},
	filename: function(req, file, callback) {
		var extension = path.extname(file.originalname);
		var basename = path.basename(file.originalname, extension);
		callback(null, basename + Date.now() + extension);
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

//메모 저장을 위한 라우팅 함수
router.route('/process/save').post(upload.array('photo', 1) ,function(req, res) {
	console.log('/process/save 호출됨.');

	try {
		var paramAuthor = req.body.author;
		var paramContents = req.body.contents;
		var paramCreateDate = req.body.createDate;

		console.log('작성자 : ' + paramAuthor);
		console.log('내용 : ' + paramContents);
		console.log('일시 : ' + paramCreateDate);

		var files = req.files;

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
			console.log('현재 파일 정보 : '+originalname+', '+filename+', '+mimetype+', '+size);
			
		}else {	//배열에 들어가 있지 않은 경우
			console.log('업로드된 파일이 배열에 들어가 있지 않습니다.');
		}


		//클라이언트에 응답 전송
		res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
        res.write('<div><p>메모가 저장되었습니다.</p></div>');
        res.write('<img src="/uploads/' + filename + '" width="200px">');
        res.write('<div><input type="button" value="다시 작성" onclick="javascript:history.back()"></div>');
        res.end();

	} catch (err) {
		console.dir(err.stack);
		res.writeHead(400, {'Content-Type':'text/html;charset=utf8'});
		res.write('<div><p>메모 저장 시 에러 발생</p></div>');
		res.end();
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

// 웹서버 시작
var server = http.createServer(app).listen(app.get('port'), function(){
	console.log('웹 서버 시작됨 -> %s, %s', server.address().address, server.address().port);
});