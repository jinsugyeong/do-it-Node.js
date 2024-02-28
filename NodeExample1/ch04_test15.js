var winston = require('winston');    				// 로그 처리 모듈
var winstonDaily = require('winston-daily-rotate-file');    	// 로그 일별 처리 모듈
var moment = require('moment');    				// 시간 처리 모듈

function timeStampFormat() {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ'); // '2016-05-01 20:14:28.500 +0900'
};

var logger = new (winston.Logger)({
    transports: [
        new (winstonDaily)({
            name: 'info-file',
            datePattern: 'YYYY-MM-DD', // 파일 날짜 형식
            dirname: './log', // 파일 경로
            filename: `server_%DATE%.log`, // 파일 이름
            colorize: false,
            maxsize: 50000000,
            maxFiles: 1000,
            level: 'info',	//(0)debug < info < notice < warnig < error < crit < alert < emerg(7)
            showLevel: true,
            json: false,
            timestamp: timeStampFormat
        }),
        new (winston.transports.Console)({
            name: 'debug-console',
            colorize: true,
            level: 'debug',
            showLevel: true,
            json: false,
            timestamp: timeStampFormat
        })
    ],
    exceptionHandlers: [
        new (winstonDaily)({
            name: 'exception-file',
            datePattern: 'YYYY-MM-DD', // 파일 날짜 형식
            dirname: './log', // 파일 경로
            filename: `exception_%DATE%.log`, // 파일 이름
            colorize: false,
            maxsize: 50000000,
            maxFiles: 1000,
            level: 'error',
            showLevel: true,
            json: false,
            timestamp: timeStampFormat
        }),
        new (winston.transports.Console)({
            name: 'exception-console',
            colorize: true,
            level: 'debug',
            showLevel: true,
            json: false,
            timestamp: timeStampFormat
        })
    ]
});


module.exports = logger;