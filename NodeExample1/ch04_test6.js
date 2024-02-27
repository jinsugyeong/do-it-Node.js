/**
 *  파일 읽고/쓰기 메소드
 *  
 * (대부분 비동기식 방식으로 파일을 읽고 씀)
 * 
 *  - readFile(filename, [encoding], [callback]) : 비동기식 IO로 파일을 읽어 들임
 *  - readFileSync(filename, [encoding]) : 동기식 IO로 파일을 읽어 들임
 *  - wirteFile(filename, data, encoding='utf8', [callback]) : 비동기식 IO로 파일을 씀
 *  - writeFileSync(filename,data, encoding='utf8') : 동기식 IO로 파일을 씀
 */
var fs = require('fs');

//파일에 데이터를 씁니다.
fs.writeFile('./output.txt', 'Hello World!', function(err) {
    if(err){
        console.log('Error : ', err);
        
    }else {

        console.log('output.txt 파일에 데이터 쓰기 완료');
    }

})