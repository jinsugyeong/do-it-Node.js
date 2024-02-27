var url = require('url');

//주소 문자열을 URL 객체로 만들기
var curURL = url.parse('https://www.google.com/search?q=파묘+해석');

//URL 객체를 주소 문자열로 만들기
var curStr = url.format(curURL)

console.log('주소 문자열 : ', curStr)
console.log(curURL);

//요청 파라미터 구분하기
var queryString = require('querystring');
var param = queryString.parse(curURL.query);

console.log('요청 파라미터 중 query의 값 : ', param.query);
console.log('원본 요청 파라미터 : ', queryString.stringify(param));