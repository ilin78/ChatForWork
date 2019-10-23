var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)
var bodyParser = require('body-parser')

app.use('/public', express.static('public'))
app.set('view engine', 'ejs', 'js')

var urlencodedParser = bodyParser.urlencoded({ extended: false })
server.listen(3000)
var mysql = require('mysql');

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: '1234',
  database: 'project',
  port: 3306
});

conn.connect();
app.get('/',  (req, res) => {
	console.log(req.url)
	res.render('start', {})	
});	


var clients = [];

io.sockets.on('connect', function(client) {
    console.log(clients.push(client)); 
    client.on('disconnect', function() {
    clients.splice(clients.indexOf(client), 1);
    });
});

users = []; // хранит всех пользователей с которыми есть соединение
connections = [] // помещяем сюда все подключения на текущий момент
/*
*		io.sockets.on - отслеживает 'connection' и вызывает  function, 
*		которая содержит объект socket. 
*/		 

io.sockets.on('connection', (socket) => {	
	/*
	* 	.push(socket) - добавление в массив connections
	*	.splice(connections.indexOf(socket), 1) - находит индекс 
	*	объекта и удаляет 1 элемент
	*/
	users=connections.push(socket);	
	console.log('connect new user' + users)
	socket.on('disconnect', (data) => {	
		--users;	
		console.log('user disconnected ' + users)
		
		connections.splice(connections.indexOf(socket), 1)
	});

	conn.query("SELECT * FROM chat", (error,result) => {
		if(error) error;
		var ret = result;		
		socket.emit('data out', ret, users);		// исправлено <- io. отправляет ret всем в т ч кто уже получил
		console.log('TEST'+ret);
	});
	/*
	*	когда вызовется 'send mess' -  обратиться к функции emit()
	*  	'add mess' - передаст mess со значением data  
	*/
	socket.on('send mess', (data) => {
		console.log({ name: data.name, mess: data.mess})
		io.sockets.emit('add mess', {
			mess: data.mess, 
			name: data.name
		})
		const name = data.name;
		const message = data.mess;
		var query = conn.query("INSERT INTO chat (name, message) VALUES (?,?)", [name, message], (err, data) => {
		  	if(err) return console.log(err);		  
		})
	})
})
console.log('Server run, port 3000')