$(()=>{
	var time = ''
	var socket = io.connect() 			// подключаем socket -> connection
	var $form = $('#messForm') 			// обращаемся к объекту по Id - messForm
	var $name = $('#name')
	
	var $input_mess = $('#message') 	// поле ввода
	var $all_mess = $('#all_mess')		// поле вывода
	var $out_mess = $('#out_mess')
	var $counter = $('#counter')
	/*
	*	Этот блок содержит соединение при новом подклюючении
	*	Если его убрать пользователю будет приходить копия сообщений последней сессии при пропадании соединения
	*/
	socket.on('connect', () => {
		$('#all_mess').empty();			
		console.log(socket.connected); // true
	});

	/*
	*	отслеживаем в форме событие submit
	*	preventDefault() - предотвращает стандартное поведение
	*	socket обращается к функции emit() для вызова события - укажет 'send mess' и данные поле ввода
	*	после отправки сообщения указываем пуcтую строку
	*/
	$form.submit((event) => {
		event.preventDefault()
	 	time = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
		socket.emit('send mess', {mess:$input_mess.val(), name:$name.val()})
		$input_mess.val('')
	})

	socket.on('add mess', (data) => {
		$all_mess.prepend(
			'<div> <k class="small">' +' </k><b> ' + data.name + '</b>: ' + data.mess + '</div><br>'
		)
	})
	
	socket.on('data out', (ret, users) => {
		$counter.empty()
		$counter.append('<div> <k class="small"> Online: ' + users + '</div>')

		$out_mess.empty()
		for (var i=0; i<ret.length; i++)
		$out_mess.prepend( 
			'<div> <k class="small">' + ' </k><b> ' + ret[i].name + '</b>: ' + ret[i].message + '</div><br>' 
		)
	}) 
})