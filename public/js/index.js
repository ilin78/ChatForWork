$(function(){
	var socket = io.connect() 			// подключаем socket -> connection
	var $form = $('#messForm') 			// обращаемся к объекту по Id - messForm
	var $time = $('#time')
	var $name = $('#name')
	var $input_mess = $('#message') 	// поле ввода
	var $all_mess = $('#all_mess')		// поле вывода
	var $out_mess = $('#out_mess')
	
	/*
	*	отслеживаем в форме событие submit
	*	preventDefault() - предотвращает стандартное поведение
	*	socket обращается к функции emit() для вызова события - укажет 'send mess' и данные поле ввода
	*	после отправки сообщения указываем путую строку
	*/
	$form.submit(function(event){
		event.preventDefault()
		time = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
		socket.emit('send mess',  {mess:$input_mess.val(), name:$name.val()})
		$input_mess.val('')
	})

	/*
	*	когда вызовется 'add mess' -  обратиться к функции emit()
	*  	append() - встраивает блок внутрь all_mess
	*/
	socket.on('add mess', function(data){
		$all_mess.append(
			'<div> <k class="small">'+ time +' </k><b> ' + data.name + '</b>: ' + data.mess + '</div><br>'
		)
	})
	
	socket.on('data out', function(ret){
		for (var i=0; i<ret.length; i++)
		$out_mess.append( '<b> ' + ret[i].name + '</b>: ' + ret[i].message + '</div><br>' )
	})
})