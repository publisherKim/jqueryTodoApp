var dataGara = [
	{id:0, important: '매우중요', addDate: '2016.12.12', descriptionText: 1},
	{id:1, important: '중요', addDate: '2016.12.13', descriptionText: 2},
	{id:2, important: '보통', addDate: '2016.12.14', descriptionText: 3},
];

// 제이쿼리 지식의 한계 파일을 분류하고도 document.ready로 실행하는 방법을 고민... mvc 패턴 로직을 만들고 html 에서 사용할 코드만 만들어서 씃게 해야 되는데 .. 알수 없음..

// 2016-12-13 16:00 start
// 1.문제를 하나하나 만나고 해결해보자.
// 2.일단 가라 데이터의 배열을 반복문으로 처리해보자.
$('document').ready(function(){
	var $descriptionList = $('.description_list');
	var $descriptionLiWrap;
	
	function makeLi(){
		for(var i = 0; i < dataGara.length; i++){
			$descriptionList.append('<li><input type="checkbox" /> 중요도 : <span class="text">"'+dataGara[i].important+'"</spa> 추가일 : <span class="add_date">"'+ dataGara[i].addDate +'"</span><a href="#none">"'+dataGara[i].descriptionText+'"</a> <input class="description_text" type="text" /> <a href="#none" class="btn btn_modify">수정</a> <a href="#none" class="btn btn_delete">삭제</a>></li>');
		}		
	}
	makeLi();
	
	// 6. 우선 데이터 추가하는 포스트(실제 통신은 없지만,) 부터 ... 말하듯이 짜는 코드는 얼마나 구린가..
	var $importantVal = $('.important_wrap');
	var $addTodoWrap = $('.add_todo_wrap');
	var $modifyBtn = $('.btn_modify');
	var postData = {};
	var addDateval;
	$importantVal.children('select').on('change', function(){
		var importantVal = $(this).val();
		postData.important = importantVal;
	});		

	function addDescriptionVal(){
		var descriptionVal = $addTodoWrap.children('input').val();
		postData.descriptionText = descriptionVal;
	}
	
	
	$addTodoWrap.children('.btn_add').off().on('click', function(){
		addDescriptionVal();
		time();
		var insertId = dataGara.length;
		postData.id = insertId + 1; 
		postData.addDate = addDateVal;
		dataGara.push(postData);
		console.log(dataGara);
		// 7 data에 추가는 준비 되었다. 이젠 마지막 요소를 리스트에 추가할 것인가 ? 다지우고 다시 그릴 것인가 ? 그리고 문득든 강제로 붙인 돔은 어떻게 처리할 것인가 ?
		// 8.음 가라데이터를 만든김에 함수를 다시 돌려야겠당... 그게 편할듯 초기화를 잘써야 했었네...
		// 9.리액트나  스파가 이런게 좋은거구나... 원하는 부부만 바꿀수 있다는게..
		$descriptionList.empty();
		// 10.음 요부분은 겟에 가깝다고 봐야하나..
		makeLi();
	});
	// create end
	
	function time(){
		var date = new Date();
		addDateVal = date.getFullYear() + '.' + (date.getMonth()+1) + '.' + date.getDay() + '.' + date.getHours() + ':' + date.getMinutes();
	}
	// modify end
	$modifyBtn.on('click', function(){
		var modifyDescription = $(this).siblings('input').text();
	});
	

});