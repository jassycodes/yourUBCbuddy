$(document).ready(function(){
	$('#findStudyBuddyInThisClass').click(function () {
		alert("findStudyBuddyInThisClass");
		$.ajax({
			type: "POST",
					url: '/user/findStudyBuddy',
					data: $('#findStudyBuddyForm').serialize(),
					success: function(response) {
					},
					error: function(error) {
									console.log(error);
					}
			});
	}
});