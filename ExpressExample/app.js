var express = require('express');
var http = require('http');
/**
 *  익스프레스 서버 객체가 가지고 있는 주요 메소드
 *  - set(name, value): 서버 설정을 위한 속성지정, get메소드로 확인 가능
 *  - get(name): 서버 설정을 위해 지정한 속성 꺼내옴
 *  - use([path,]function[,function...]): 미들웨어 함수를 사용
 *  - get([path,]function): 특정 패스로 요청된 정보를 처리
*/
var app = express();

//기본 포트를 app 객체에 속성으로 설정
/**
 * 서버 설정을 위해 미리 정해진 주요 속성 이름
 *  - env :  서버 모드 설정
 *  - views :  뷰들이 들어 있는 폴더 또는 폴더 배열 설정
 *  - view engine :  디폴트로 사용할 뷰 에닌 설정
 */
app.set('port', process.env.PORT || 3000);

//Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express 서버를 시작했습니다 : ', app.get('port'));
});