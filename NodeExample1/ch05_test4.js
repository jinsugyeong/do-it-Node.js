var http = require('http');
var server = http.createServer(function(req, res) {
    //클라이언트 요청 이벤트
    console.log('클라이언트 요청이 들어왔습니다.');
    res.writeHead(200, {"Content-Type":"text/html; charset=utf8"});
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write(" <head>");
    res.write("     <title>응답 페이지</title>");
    res.write(" </head>");
    res.write(" <body>");
    res.write("     <h1>Node.js로부터의 응답 페이지</h1>");
    res.write(" </body>");
    res.write("</html>");
    res.end();
});
var port = 3000;
server.listen(port, function(){
    console.log('웹 서버가 시작되었습니다. ', port);
})

