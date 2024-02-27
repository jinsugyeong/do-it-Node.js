/**
 * 이벤트 보내고 받기
 * 
 *  노드는 대부분 이벤트를 기반으로 하는 비동기 방식으로 처리함.
 *  비동기 방식으로 처리하기 위해 서로 이벤트를 전달함
 *  (함수를 실행한 결과물도 이벤트로 전달)
 *  이런 이벤트를 보내고 받을 수 있도록 만들어 진 것 =  EventEmitter
 *  이 때 다른쪽에서 이 이벤트를 받고 싶다면 이벤트 리스너를 등록할 수 있음
 *  이벤트리스너(Event Listener):특정 이벤트가 전달되었을 때 그 이벤트를 처리할 수 있도록 만들어 둔 것
 * 
 *  노드의 객체는 EventEmitter를 상속받을 수 있으며, 
 *  상속받은 후에는 on()과 emit(다른쪽으로 이벤트 전달)메소드 사용가능
 * 
 *  - on(event, listener): 지장한 이벤트의 리스너를 추가
 *  - once(event, listener): 지정한 이벤트를 추가하지만 한 번 실행한 후에는 자동으로 리스너가 제거됨
 *  - removeListener(event, listener): 지정한 이벤트에 대한 리스너를 제거
 */

/*
process.on('exit', function(){
    console.log('exit 이벤트 발생');
})
setTimeout(function(){
    console.log('2초 후에 시스템 종료 시도함');

    process.exit();
}, 2000);
*/

process.on('tick', function(count){
    console.log('tick 이벤트 발생 : %s', count);
})

setTimeout(function(){
    console.log('2초 후에 tick 이벤트 전달 시도함');

    process.emit('tick','2');
}, 2000);