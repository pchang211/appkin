$(document).ready(function() {
	populateEventList();
	$('#btnAddUser').on('click', addUser);
	$('#btnDelUser').on('click', deleteUser);
	$('#btnAddEvent').on('click', addEvent);
	$('#btnDelEvent').on('click', deleteEvent);
	$('#attendBtn').on('click', dummy);

	$('#eventList').on('click', 'td a.attendbtn', dummy);

	$('#eventList').on('click', 'td a.linkshowevent', showEvent);
});

function showEvent(e) {
	e.preventDefault();
	var event;
	$.getJSON('/events/' + $(this).attr('rel'), function(data) {
		event = data;
		$('#eventInfoName').text(data.name);
		$('#eventInfoTime').text(data.time);
		$('#eventInfoMin').text(data.min);
		console.log(event);
	});
	
	var users = [];
	var usernames = [];
	users = getUsers();
	console.log('users objects: ' + users);
	users.forEach(function(user) {
		usernames.push(user.name);
	});
	console.log('usernames: ' + usernames);
	$("#usersField").autocomplete({ source: usernames });
}

function dummy(event) {
	event.preventDefault();
	console.log($(this).attr('rel'));
	alert('clicked');
}

function populateEventList() {
	var events = [];
	var tableContent = '';

	$.getJSON('/events/', function(data) {
		events = data;
		$.each(data, function() {
			tableContent += '<tr>';
			tableContent += '<td><a href="#" class="linkshowevent" rel="' + this._id + '" title="Show Attendees">' + this.name + '</a></td>';
			tableContent += '<td>' + this.time + '</td>';
			tableContent += '<td>' + this.min + '</td>';
			// tableContent += '<td><input class="autocomplete"></td>';
			// tableContent += '<td><a href="#" class="attendbtn" rel=' + this._id + '><button type="button" class="btn btn-default">Attend</button></a></td>';
			tableContent += '</tr>';
		});

		$('#eventList table tbody').html(tableContent);
		
		var users = [];
		var usernames = [];
		users = getUsers();
		console.log('users objects: ' + users);
		users.forEach(function(user) {
			usernames.push(user.name);
		});
		console.log('usernames: ' + usernames);
		$(".autocomplete").autocomplete({ source: usernames });
	});
}

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
		'attendees': []
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

	populateEventList();
}

function deleteEvent(event) {
	event.preventDefault();

	var thisEventName = $('#editEvent fieldset input#inputEventName').val();
	$.ajax({
		type: 'DELETE',
		url: '/events/delete/' + thisEventName
	}).done(function(response) {
		alert('done deleting event');
	});

	populateEventList();
}

function getUsers() {
	var users = [];
	$.ajax({
		type: 'GET',
		dataType: 'JSON',
		url: '/users',
		async: false
	}).done(function(response) {
		users = response;
	});
	return users;
}
