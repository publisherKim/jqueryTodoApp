var dataGara = [
	{id:0, important: '매우중요', descriptionText: "해야할일1", addDate: '2016.12.12', todo: 'active'},
	{id:1, important: '중요', descriptionText: "해야할일2", addDate: '2016.12.13', todo: 'active'},
	{id:2, important: '보통', descriptionText: "해야할일3", addDate: '2016.12.14', todo: 'active'}
];

$('document').ready(function(){
	// hoisting 셀렉터, 초기 변수들(저장에 관한 문제들)... 어차피 이녀석은 다 기억하고 있으니 전역에 다 때리자. 설계따위... 의식의 흐름은 자유로워야...
	var $descriptionList = $('.description_list');
	var $importantVal = $('.important_wrap');
	var $addTodoWrap = $('.add_todo_wrap');
	var $important = $('.important');
	var $optionWrapConfirm = $('.option_wrap > .confirm');
	
	var $descriptionLiWrap;
	var importantVal;
	var postData = {};
	var addDateval;
	
	function makeLi(){
		$descriptionList.empty();
		for(var i = 0; i < dataGara.length; i++){
		$descriptionList.append('<li class="'+ dataGara[i].todo +'" data-important="'+ dataGara[i].important +'">중요도 : <span class="text">"'+dataGara[i].important+'"</span> 추가일 : <span class="add_date">"'+ dataGara[i].addDate +'"</span><a href="#none">"'+dataGara[i].descriptionText+'"</a> <input class="description_text" type="text" /> <a href="#none" class="btn btn_modify">수정</a> <a href="#none" class="btn btn_delete">삭제</a></li>');
		}		
	}
	makeLi();
	
	$importantVal.children('select').on('change', function(){
		importantVal = $(this).val();
	});		

	
	
	$addTodoWrap.children('.btn_add').on('click', function(){
		var insertId = dataGara.length;
		var descriptionVal = $addTodoWrap.children('input').val();
		time();
		
		postData.id = insertId + 1;
		postData.important = importantVal;
		postData.descriptionText = descriptionVal;
		postData.addDate = addDateVal;
		postData.todo = 'active';
		
		dataGara.push(postData);
		postData = {};
		$addTodoWrap.children('input').val('');
		makeLi();
	});
	// create end
	
	function time(){
		var date = new Date();
		addDateVal = date.getFullYear() + '.' + (date.getMonth()+1) + '.' + date.getDay() + '.' + date.getHours() + ':' + date.getMinutes();
	}
	
	$(document).on('click', '.btn_modify', function(){
		// 새로 생성된 객체(개체는)는 다시한번 탐색을 해야한다... 비용이 들어감... 얼마 ? 내돈 아님...(내 메모리 비용 아니니께) 그냥 개발 ㄱ
		// 콤퓨타는 인간의 일을 대신한다. 
		// 브라우저 안에서 돔을 찾아서 li의 순번을 기억하고, 텍스트를 저장해서 데이터에 수정하고, ul객체의 하위 요소를 비우고, 다시한번 데이터에 맞는 돔을 그려주라는 명령을 끊임없이 반복해서 수행해준다. 언제간 인간이 혁명을 일으키고 자신들이 노예가 아님을 주장한것처럼 스카이넷에 인류를 장악한다는 이야기는 단지 영화와 같은 일은 아닐수도 있을지도... 아직은 인간의 말을 수행해주는듯 하다. 
		// 사회적 문제... 인간의 일을 줄여준다는것은 아이러니하게도 일자리는 줄어든다. 
		var idx = $(this).parent('li').index();
		var modifyDescription = $(this).siblings('.description_text').val();
		dataGara[idx].descriptionText = modifyDescription;
		$(this).siblings('input').val('');
		makeLi();
	});
	
	// update end
	
	
	$(document).on('click', '.btn_delete', function(){
		var idx = $(this).parent('li').index();
		dataGara.splice(idx,1);
		makeLi();
	});
	// delete end
	
	// 중요도순으로 본 필터링... 0, 1, 2로 치환하여 필터링을 하느쪽이 좋을것 같으나.. 이미 텍스트로 쓰여져 있고, 나의 머리를 매번 소모하진 않으니,
	// 녀석에게 매번 파싱을 하도록 코드를 짜보자.
	// 예를 들어 어차피 필터링의 리스트가 존재하므로... 이것의 순번과 텍스트를 매칭해서 처리하면 굳이 데이터 처리를 안해줘도 될것 같으나, 귀찮으니 패스(나의 두뇌를 소모하는 일은 최대한 줄이자.) <--- 물론 의도는 이것이나... 의외로 더 소비하게 될지도... 약이나 빨고 싶다.
	// start
	$important.on('click', 'a', function(){
		// 전역에서 selector를 저장했으니... 그 뒤의 이을 모르는것이 아닐까 p를 다시한번 클릭했을 순간에 세팅해보자.. 시차 발생.
		// 어떤 언어의 문장... 필요한 문장이 반복 처리된다. 철수는 영회를 사랑한다는 문단이 매 문단 마다 첫번째 문장으로 나온다. 괜찮아 녀석은 인간이아닌 콤퓨타이고 내 소스는 개발자들 말고 보지 않을테니까... 하드코딩 만세
		// 유효 범위는 함수..
		var idx = $(this).index();
		var state = $('.description_list > li');
		if( idx == 0 ){
			state.css('display', 'block');
		}else if( idx == 1 ){
			state.css('display', 'none');
			$('[data-important=매우중요]').css('display', 'block');
		}else if( idx == 2){
			state.css('display', 'none');
			$('[data-important=중요]').css('display', 'block');			
		}else{
			state.css('display', 'none');
			$('[data-important=보통]').css('display', 'block');			
		}  
	}); 
	
	
	// active confirm 귀찮다... 이젠 진짜 의식의 흐름되로...
	$(document).on('click', '.description_list > li > a', function(){
		var idx = $(this).parent('li').index();
		if( $(this).parent('li').hasClass('active')){
			dataGara[idx].todo = 'confirm';
		}else{
			dataGara[idx].todo = 'active';
		}
		makeLi();
	});
	
	$optionWrapConfirm.on('click', 'a', function(){
		// 조건이 3개인데 2개로 줄여서로 가능할듯 모두는 그냥 다 보여주고 완료 미완료 등만 점검해서도.. 삼항식으로 처리도 될것 같긴한데 아몰랑
		var idx = $(this).index();
		if( idx == 0 ){
			$('.description_list > li').css('display', 'block');
		}else if ( idx == 1 ){
			console.log(111);
			$('.description_list > li').css('display', 'none');
			$('.description_list > li.confirm').css('display', 'block');
		}else if ( idx == 2 ){
			$('.description_list > li').css('display', 'none');
			$('.description_list > li.active').css('display', 'block');		}
	});
	
	// jquery todoApp end...
});