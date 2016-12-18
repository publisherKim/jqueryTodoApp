var dataGara = [
	{id:0, important: '매우중요', descriptionText: "해야할일1", addDate: '2016.12.12', todo: 'active'},
	{id:1, important: '중요', descriptionText: "해야할일2", addDate: '2016.12.13', todo: 'active'},
	{id:2, important: '보통', descriptionText: "해야할일3", addDate: '2016.12.14', todo: 'active'}
];

$('document').ready(function(){
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

	// start
	$important.on('click', 'a', function(){
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