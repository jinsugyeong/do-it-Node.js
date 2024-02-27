/*  
 *    flag 종류
 *  
 *  - 'r' : 읽기에 사용, 파일이 없으면 예외 발생
 *  - 'w' : 쓰기에 사용, 파일이 없으면 만들어지고, 있으면 이전 내용을 모두 삭제
 *  - 'w+' : 읽기와 쓰기에 모두 사용, 파일이 없으면 만들어지고, 있으면 이전 내용을 모두 삭제
 *  - 'a+' : 읽기와 추가에 모두 사용, 파일이 없으면 만들어지고, 있으면 이전 내용에 새로운 내용을 추가
 */
var fs = require('fs');

fs.open('./output.txt', 'r', function(err, fd) {
    if(err) throw err;

    var buf = new Buffer.alloc(10);
    console.log('버퍼 타입 : %s',Buffer.isBuffer(buf));

    fs.read(fd, buf, 0, buf.length, null, function(err, bytesRead, buffer){
        if(err) throw err;

        var inStr = buffer.toString('utf8', 0, bytesRead);
        console.log('파일에서 읽은 데이터 : %s', inStr);
        
        console.log(err, bytesRead, buffer);

        fs.close(fd, function(){
            console.log('output.txt 파일을 열고 읽기 완료2222222');
        })
    })

})