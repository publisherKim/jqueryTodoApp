var dataGara = [
	{id:1, important: '매우중요', addDate: '2016.12.12', descriptionText: 1},
	{id:2, important: '중요', addDate: '2016.12.13', descriptionText: 2},
	{id:3, important: '보통', addDate: '2016.12.14', descriptionText: 3},
];

// 제이쿼리 지식의 한계 파일을 분류하고도 document.ready로 실행하는 방법을 고민... mvc 패턴 로직을 만들고 html 에서 사용할 코드만 만들어서 씃게 해야 되는데 .. 알수 없음..

// 2016-12-13 16:00 start
// 1.문제를 하나하나 만나고 해결해보자.
// 2.일단 가라 데이터의 배열을 반복문으로 처리해보자.
$('document').ready(function(){
	var $descriptionList = $('.description_list');
	for(var i = 0; i < dataGara.length; i++){
		// 3.부분적인 문제들 돔을 생성하는거에서부터 딜레이 생김.
		var $descriptionLi = $descriptionList.append('<li></li>');
		// 4. 다 쪼갤려고 했는데 귀찮다 요정도를 한덩어리로 보자.
		// 5. 저안에서 템플릿으로 뺀다던지 갈길이 산더미...
		var $descriptionLiWrap = $descriptionLi.append('<input type="checkbox" /> 중요도 : <span class="text">"'+dataGara[i].important+'"</spa> 추가일 : <span class="add_date">"'+ dataGara[i].addDate +'"</span><a href="#none">"'+dataGara[i].descriptionText+'"</a><input class="description_text" type="text" />');
		console.log(dataGara[i]);
	}
});