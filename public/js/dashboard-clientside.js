$(document).ready(function(){

	$('#findStudyBuddy').click(function () {
		// window.location.replace('http://localhost:9000/user/find-a-study-buddy');
		window.open("http://localhost:9000/user/find-a-study-buddy", '_blank');
	});

	$('#scheduleMeeting').click(function () {
		alert("SHCEDULE A MEETING - coming soon");
		// window.open("http://localhost:9000/user/find-a-study-buddy", '_blank');
	});

	$('#UBCclassesButton').click(function () {
		// window.location.replace('http://localhost:9000/user/UBC-classes');
		window.open("http://localhost:9000/user/UBC-classes", '_blank');
	});

	$('#UBCclassfeedbackButton').click(function () {
		window.open('http://localhost:9000/user/UBC-class-feedback', '_blank');
	});

	$('#UBCprofButton').click(function () {
		// window.location.replace('http://localhost:9000/user/UBC-classes');
		alert("UBC PROFESSORS INFO - coming soon");
		// window.open('http://localhost:9000/user/UBC-class-feedback', '_blank');
	});



});