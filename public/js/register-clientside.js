$(document).ready(function(){

	// // var scntDiv = $('#p_scents');
 //    var i = $('#schoolClasses').size();

	// $('#addAClass').click(function () {
	// 	// alert("add a class");
	// 	// $('#schoolClasses').append('<div id="schoolClasses"><input name="course_code" class="formContentSmaller" placeholder="CPSC"> <input name="subj_code" class="formContentSmaller" placeholder="310"><input name="section_code" class="formContentSmaller" placeholder="005"><button id="removeSchoolClass" type="button" style="margin-left: 10px;">Remove</button></div>');
	// 	$('#schoolClasses').append('<div id="schoolClasses"><input name="course_code" class="formContentSmaller" placeholder="CPSC"> <input name="subj_code" class="formContentSmaller" placeholder="310"><input name="section_code" class="formContentSmaller" placeholder="005">');
	// 	i++;
	// 	console.log(i);
	// 	return false;
	// });
	$("#msg").append("<p align='center' class='redText'>Password doesn't match <p>");
	$("#msg").hide();

	$('#createAccount').click(function () {
		alert("created an account!");
		var password = $("input[name=pword]").val();
		var cPword = $("input[name=confirmPword]").val();

		if(password != cPword){
			$("#msg").show();
		}
		else{
			$("#msg").hide();
		}

	});

});