/**
 *  스트림 단위로 파일 읽고 쓰기
 * 
 *  스트림 = 데이터가 전달되는 통로
 *  - createReadStream(path, [options]): 파일을 읽기 위한 객체 만듦
 *  - createWriteStream(path, [options]): 파일을 쓰기 위한 객체 만듦
 * (옵션:flags, encoding, autoClose 속성이 들어있는 자바스크립트 객체 전달 가능)
 */

var fs = require('fs');
var infile = fs.createReadStream('./output.txt', {flag: 'r'});
var outfile = fs.createWriteStream('./output2.txt', {flag: 'w'});

infile.on('data', function(data) {
    console.log('읽어 들인 데이터', data);
    outfile.write(data);
});

infile.on('end', function(){
    console.log('파일 읽기 종료');
    outfile.end(function(){
        console.log('파일 쓰기 종료.');
    })
})