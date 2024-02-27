var url = require('url');

//주소 문자열을 URL 객체로 만들기
var curURL = url.parse('https://www.github.com/jinsugyeong');

//URL 객체를 주소 문자열로 만들기
var curStr = url.format(curURL)

console.log('주소 문자열 : ', curStr)
console.log(curURL);