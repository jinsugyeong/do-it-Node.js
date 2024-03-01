var express = require('express')
	, http = require('http')
	, path = require('path');

var bodyParser = require('body-parser')
	, static = require('serve-static')
    , expressErrorHandler = require('express-error-handler');

var fs = require('fs');

var app = express();
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', static(path.join(__dirname, 'public')));

//라우터 사용하여 라우팅 함수 등록
var router = express.Router();

router.route('/process/save').post(function(req, res) {
	console.log('/process/save 호출됨.');

	try{
		var paramAuthor = req.body.author;
		var paramContents = req.body.contents;
		var paramCreateDate = req.body.createDate;

		console.log('작성자 : ' + paramAuthor);
		console.log('내용 : ' + paramContents);
		console.log('일시 : ' + paramCreateDate);
		
		res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});
		res.write('<div><p>메모가 저장 되었습니다.</p></div>');
		res.write('<div><input type="button" value="다시작성" onclick="javascript:history.back()" /></div>');
		res.end();
		
	}catch(err) {
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