/**
 * 1. 하나의 파일을 만들고 각 줄에는 공백으로 구분된 이름, 나이, 전화번호가 들어가도록 구성
 * 2. 파일의 내용을 한 줄씩 읽어 들이면서 각 정보를 공백으로 구분
 * 3. 구분된 정보 중에서 이름만 화면에 출력
 */

var fs = require('fs');

fs.readFile('./mission01.txt', 'utf8', function(err, data) {
    if(err) throw err;
    var info = {};
    var line = data.split('\n');
    var tmp;
    line.forEach(function(data, idx) {
        tmp = data.split(':');
        info[tmp[0]] = tmp[1];
    })

    console.log(info.name);
    
})