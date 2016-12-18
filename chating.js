var dataChat = [
	{id:'me', text:'내용1'},
	{id:'you', text:'니가말한 내용1'},
	{id:'me', text:'내용2'},
	{id:'you', text:'니가말한 내용2'},
	{id:'me', text:'내용3'},
	{id:'you', text:'니가말한 내용3'}
]
$('document').ready(function(){
	var $chatingLi = $('.chating_li');
	var $writeMe = $('.write_me');
	var $writeYou = $('.write_you');
	var $btnMe = $('.btn_me');
	var $btnYou = $('.btn_you');
	
	function chatLi(){ 
		$chatingLi.empty();
		for(var i = 0; i < dataChat.length; i++){
			$chatingLi.append('<li class="'+ dataChat[i].id +'">"'+ dataChat[i].text +'"</li>')	
		}
	}
	chatLi();
	
	$btnMe.on('click', function(){
		var postData = {};
		var textVal = $btnMe.siblings('.write_me').val();
		postData.id = 'me';
		postData.text = textVal;
		dataChat.push(postData);
		$btnMe.siblings('.write_me').val('');
		chatLi();
	});
	
	$btnYou.on('click', function(){
		var postData = {};
		var textVal = $btnMe.siblings('.write_you').val();
		postData.id = 'you';
		postData.text = textVal;
		dataChat.push(postData);
		$btnMe.siblings('.write_you').val('');
		chatLi();
	});	
});