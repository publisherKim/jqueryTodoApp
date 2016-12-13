var dataGara = [
	{id:0, important: '매우중요', descriptionText: 1, addDate: '2016.12.12', },
	{id:1, important: '중요', descriptionText: 2, addDate: '2016.12.13'},
	{id:2, important: '보통', descriptionText: 3, addDate: '2016.12.14'}
];

$('document').ready(function(){
	var $descriptionList = $('.description_list');
	var $descriptionLiWrap;
	var importantVal;
	var $importantVal = $('.important_wrap');
	var $addTodoWrap = $('.add_todo_wrap');
	var postData = {};
	var addDateval;
	
	function makeLi(){
		$descriptionList.empty();
		for(var i = 0; i < dataGara.length; i++){
		$descriptionList.append('<li><input type="checkbox" /> 중요도 : <span class="text">"'+dataGara[i].important+'"</span> 추가일 : <span class="add_date">"'+ dataGara[i].addDate +'"</span><a href="#none">"'+dataGara[i].descriptionText+'"</a> <input class="description_text" type="text" /> <a href="#none" class="btn btn_modify">수정</a> <a href="#none" class="btn btn_delete">삭제</a></li>');
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
		// jquery 새로 생성된 객체 태그는 못찾으나.. 클래스(식별자에 무얼 한거냐... )는 찾는다... ??
		var idx = $(this).parent('li').index();
		var modifyDescription = $(this).siblings('.description_text').val();
		console.log(modifyDescription);
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
});