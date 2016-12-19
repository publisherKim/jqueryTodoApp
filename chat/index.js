var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.send('<h1>Hello world</h1>');
});


app.get('/chat', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

// 이벤트 발생시키는거 같은데... 잘 모르겠다.
//io.emit('some event', { for: 'everyone' });


io.on('connection', function(socket){
	// 공지처럼 등장하면 메세지 보내는거 같은데 작동안한다...
	socket.broadcast.emit('hi 만나서 반가워');
	socket.on('chat message', function(msg, name){
		console.log('message : ' + msg);
		io.emit('chat message', name + ' 님의 말 : ' +  msg);
	});
	
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});