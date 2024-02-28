/**
 *  서버에서 다른 웹 사이트의 데이터를 가져와 응답하기
 * 
 *  서버에서 다시 다른 웹 사이트를 접속하여 데이터를 가져온 후 응답하는 과정 
 *  ㄴ http 클라이언트 기능 사용해야됨 
 *  ㄴ GET(get)이나 POST(request) 방식으로 다른사이트에 데이터를 요청해야됨
 */

var http = require('http');
var options = {
    host: 'www.google.com',
    port: 80,
    path: '/'
};
var req = http.get(options, function(res){
    //응답처리
    var resData = '';
    res.on('data', function(chunk){
        resData += chunk;
    });

    res.on('end', function(){
        console.log(resData);
    });
});

req.on('error', function(err){
    console.log('오류 발생: ', err.message);
})
