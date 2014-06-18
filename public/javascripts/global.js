$(document).ready(function() {
	$('#btnAddUser').on('click', addUser);
	$('#btnDelUser').on('click', deleteUser);
	$('#btnAddEvent').on('click', addEvent);
});

function addUser(event) {
	event.preventDefault();
	
	var newUser = {
		'name': $('#addUser fieldset input#inputUserName').val(),
		'email': $('#addUser fieldset input#inputUserEmail').val()
	};

	$.ajax({
		type: 'POST',
		data: newUser,
		url: '/users/adduser',
		dataType: 'JSON'
	}).done(function(response) {
		if (response.msg === '') {
			$('#addUser fieldset input').val('');
			alert('User added');
		}
		else {alert('Error')}
	});
}

function deleteUser(event) {
	event.preventDefault();
	
	//var confirmation = confirm('Are you sure you want to delete this user?');
	var thisUserName = $('#inputUserName').val();
	//alert($(this).attr('rel'));
	
	$.ajax({
		type: 'DELETE',
		url: '/users/deleteuser/' + thisUserName
	}).done(function(response) {
		alert('done');
	});
}

function addEvent(event) {
	event.preventDefault();

	var newEvent = {
		'name': $('#editEvent fieldset input#inputEventName').val(),
		'time': $('#editEvent fieldset input#inputEventTime').val(),
		'min': $('#editEvent fieldset input#inputEventMin').val(),
	};

	$.ajax({
		type: 'POST',
		data: newEvent,
		url: '/events/addevent',
		dataType: 'JSON'
	}).done(function(response) {
		if (response.msg === '') {
			$('#editEvent fieldset input').val('');
			alert('Event added');
		}
		else {alert('Error')}
	});
}