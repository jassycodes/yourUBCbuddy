$(document).ready(function(){

	function fetchEnrollments(){
		$.ajax({
			type: "GET",
					url: '/user/profile/getUserEnrollmentInfo',
					data: $('#successget').serialize(),
					success: function(response) {
						console.log(response);
						for (row = 0; row < response.length ; row++) {
							// console.log(response[row].subject_code);
							// console.log(response[row].course_number);
							// console.log(response[row].course_section);
							$("#userEnrollmentInfo").append("<b>" + response[row].subject_code + "</b>" + ": " + response[row].course_number + " " + response[row].course_section+ "<br>");
						}
					},
							error: function(error) {
									console.log(error);
					}
			});
	}

	fetchEnrollments();

});