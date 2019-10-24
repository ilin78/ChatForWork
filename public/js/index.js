$(()=>{
	var socket = io.connect(); 			
	var $form = $('#messForm'); 			
	var $name = $('#name');
	var $input_mess = $('#message'); 	
	var $all_mess = $('#all_mess');		
	var $out_mess = $('#out_mess');
	var $counter = $('#counter');
	

	socket.on('connect', () => {
		$('#all_mess').empty();			
		console.log(socket.connected); 
	});
	
	$form.submit((event) => {
		event.preventDefault();
		socket.emit('send mess', { mess:$input_mess.val(), name:$name.val()});
		$input_mess.val('');
	});

	socket.on('add mess', (data) => {
		$all_mess.prepend(
			'<div> <k class="small">'+ data.time +' </k><b> ' + data.name + '</b>: ' + data.mess + '</div><br>'
		);
	});
	
	socket.on('data out', (ret, users) => {
		$counter.empty()
		$counter.append('<div> <k class="small"> Online: ' + users + '</div>')

		$out_mess.empty()
		for (var i=0; i<ret.length; i++)
		$out_mess.prepend( 
			'<div> <k class="small">' + ret[i].time + ' </k><b> ' + ret[i].name + '</b>: ' + ret[i].message + '</div><br>' 
		)
	}) 
})