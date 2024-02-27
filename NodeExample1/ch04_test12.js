var fs = require('fs');
var inname = './output.txt';
var outname = './output2.txt';
fs.exists(outname, function(exists) {
    if(exists) {
        fs.unlink(outname, function(err){   //기존에 만들어 놓은  output2.txt가 있으면 이전 파일이 삭제되도록 unlink 메소드 사용
            if(err) throw err;
            console.log('기존 파일 [' + outname + '] 삭제함.');
        });
    }
    var infile = fs.createReadStream(inname, {flags: 'r'});
    var outfile = fs.createWriteStream(outname, {flags: 'w'});
    infile.pipe(outfile);   //pipe 메소드로 객체 연결
    console.log('파일 복사 ['+ inname +'] -> ' + '['+ outname +']');
})