/**
 * 파일을 직접 열고 닫으면서 읽고/쓰기 메소드
 * 
 *  - open(path, flags, [mode], [callback]): 파일 열기
 *  - read(fd, buffer, offset, length, position, [callback]): 지정한 부분의 파일 내용을 읽어 들임
 *  - write(fd, buffer, offset, length, position, [callback]):  파일의 지정한 부분에 데이터를 씀
 *  - close(fd, [callback]): 파일 닫기
 * 
 *  !함수 호출 순서
 * open > write > close
 */
var fs = require('fs');

fs.open('./output.txt', 'w', function(err, fd){
    if(err) throw err;
    /*
    Buffer 오류 발생 / 해결방법 New 예약어를 from 메소드로 변경
    [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
    출처 : https://kindload-save.tistory.com/3 
    */
    var buf = Buffer.from('안녕!\n');
    fs.write(fd, buf, 0, buf.length, null, function(err, written, buffer) {
        if(err) throw err;

        console.log(err, written, buffer);
        
        fs.close(fd, function(){
            console.log('파일 열고 데이터 쓰고 파일 닫기 완료.');
        });
    });
}); 