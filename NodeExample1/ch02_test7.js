/**
 * 시스템 정보를 알려주는 OS 내장 모듈
 * 
 *  - hostname() : 운영체제의 호스트 이름을 알려줌
 *  - totalmem() : 시스템의 전체 메모리 용량 알려줌
 *  - freemem() : 시스템에서 사용 가능한 메모리 용량 알려줌
 *  - cpus() : CPU  정보 알려줌
 *  - networkInterfaces() : 네트워크 인터페이스 정보를 담은 배열 객체 반환
 */

var os = require('os');

console.log('hostname : %s', os.hostname());
console.log('메모리 : %d / %d', os.freemem(), os.totalmem());
console.log('CPU 정보\n',os.cpus());
console.log('네트워크 인터페이스 정보\n', os.networkInterfaces());