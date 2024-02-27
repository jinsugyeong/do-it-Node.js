/**
 *  파일 다루기
 * 
 * 파일시스템은 파일을 다루는 기능과 디렉터리를 다루는 기능으로 구성됨
 * 동기식 IO(파일 작업이 끝날 때까지 대기), 
 * 비동기식 IO(파일 작업을 요청만 하고 그 다음 작업 바로 수행) 기능을 함께 제공
 * 이후 파일 작업이 끝나면 그 상태는 이벤트로 받아서 처리함
 * 동기식 = Sync
 */

var fs = require('fs');

//파일을 동기식 IO로 읽어 들입니다
var data = fs.readFileSync('./README.md', 'utf-8');

//읽어 들인 데이터 출력
console.log(data)


//파일을 비동기식 IO로 읽어들입니다.
fs.readFile('./README.md', 'utf-8', function(err, data) {
    console.log(data);
})
console.log('프로젝트 폴더 안의 리드미 파일을 읽도록 요청했습니다.');