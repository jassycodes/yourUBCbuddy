$(document).ready(function(){
// alert("userClassFeedback");

	Object.size = function(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	};

	var subjectCode;
	var courseCode;

	$('#getClassFeedbackButton').click(function() {
		// console.log(response);
		// alert("getClassFeedbackButton")
		subjectCode = $("#subject").val();
		console.log(subjectCode);
		courseCode = $("#course_code").val();
		// $("#subjCodeH4").empty();
		// $("#courseNumH4").empty();
		loadQuery(subjectCode,courseCode);
		// $("#courseNumH4").append(courseCode);
		fetchFeedback();
	});
	function loadQuery(subjectCode, courseCode){

		$("#subjCodeH4").append(subjectCode);
		$("#courseNumH4").append(courseCode);
	}
	// console.log("subjectCode", subjectCode);

	function fetchFeedback(){
			// alert("fetchFeedback");
			$.ajax({
				type: "POST",
						url: '/user/load-class-feedback',
						data: $('#classFeedbackForm').serialize(),
						success: function(response) {
						},
						error: function(error) {
										console.log(error);
						}
				});
	}

	// function fetchFeedback(){
	// 	$.ajax({
	// 		type: "POST",
	// 				url: '/user/load-class-feedback',
	// 				data: $('#classFeedbackForm').serialize(),
	// 				success: function(response) {
	// 				},
	// 						error: function(error) {
	// 								console.log(error);
	// 				}
	// 		});
	// }

	// function fetchFeedback(){
	// 	$.ajax({
	// 		type: "POST",
	// 				url: '/user/load-class-feedback',
	// 				data: $('#successget').serialize(),
	// 				success: function(response) {
	// 					console.log(response);
	// 					$("#classFeedbackDiv").empty();
	// 						for (row = 0; row < response.length ; row++) {
	// 							console.log(response[row].sender_username);
	// 							console.log(response[row].feedback);
	// 							$("#classFeedbackDiv").append("<b>" + response[row].sender_username + "</b>" + ": " + response[row].feedback + "<br>");
	// 							// $("#messages").append("<b>" + response[row].sender_username + "</b>" + ": " + response[row].message + "<br>");
	// 						}

	// 					setTimeout(fetchFeedback,1000);
	// 				},
	// 						error: function(error) {
	// 								console.log(error);
	// 				}
	// 		});
	// }
	// fetchFeedback();

	$("#postFeedback").click(function(e) {
		alert("postFeedback");
			// e.preventDefault();
			$.ajax({
			type: "POST",
					url: '/user/sendtochatbox',
					data: $('#chatform').serialize(),
					success: function(response) {
						// $("#messages").empty();
					},
							error: function(error) {
									console.log(error);
					}
			});
	});

});