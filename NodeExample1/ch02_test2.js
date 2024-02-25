/**
 * 프로세스 객체
 * 
 *  - argv : 프로세스를 식ㄹ행할 때 전달되는 파라미터 정보
 *  - env : 환경 변수 정보
 *  - exit() : 프로세스를 끝내는 메소드
 */


console.log('argv : ', process.argv);
console.log('env : ', process.env);
process.exit();