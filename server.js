var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)
var bodyParser = require('body-parser')
var users = []; 
var connections = [];
var clients = [];

app.use('/public', express.static('public'))
app.set('view engine', 'ejs', 'js')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

server.listen(3000);

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
io.sockets.on('connect', function(client) {
    clients.push(client);
    client.on('disconnect', function() {
    clients.splice(clients.indexOf(client), 1);
    });
});
io.sockets.on('connection', (socket) => {	
	users=connections.push(socket);	
	socket.on('disconnect', (data) => {	
		--users;	
		connections.splice(connections.indexOf(socket), 1)
	});
	conn.query("SELECT * FROM chat", (error,result) => {
		if(error) error;
		var ret = result;		
		socket.emit('data out', ret, users);
	});
	
	socket.on('send mess', (data) => {
		var data2 = {
			mess: data.mess, 
			name: data.name,
			time: new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
		}
		io.sockets.emit('add mess', data2);
		const name = data.name;
		const message = data.mess;
		const time = data2.time;
		var query = conn.query("INSERT INTO chat (name, message, time) VALUES (?,?,?)", [name, message, time
		], (err, data) => {
		  	if(err) return console.log(err);		  
		});
	});
});
console.log('Server run, port 3000')