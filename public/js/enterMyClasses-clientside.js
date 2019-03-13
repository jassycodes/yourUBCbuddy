// $(document).ready(function(){

// 	// var scntDiv = $('#p_scents');
//     var i = $('#schoolClasses').size();

// 	$('#addAClass').click(function () {
// 		// alert("add a class");
// 		// $('#schoolClasses').append('<div id="schoolClasses"><input name="course_code" class="formContentSmaller" placeholder="CPSC"> <input name="subj_code" class="formContentSmaller" placeholder="310"><input name="section_code" class="formContentSmaller" placeholder="005"><button id="removeSchoolClass" type="button" style="margin-left: 10px;">Remove</button></div>');
// 		// $('#schoolClasses').append('<div id="schoolClasses"><input name="course_code" class="formContentSmaller" placeholder="CPSC"> <input name="subj_code" class="formContentSmaller" placeholder="310"><input name="section_code" class="formContentSmaller" placeholder="005">');
// 		i++;
// 		$('#schoolClasses').append('<div id="schoolClasses"><input class="formContentSmaller" placeholder="CPSC" id="myClass' + i +'"> <input name="subj_code" class="formContentSmaller" placeholder="310"><input name="section_code" class="formContentSmaller" placeholder="005">');
// 		$('#schoolClasses').append('<button id="removeSchoolClass' + i +'" type="button" style="margin-left: 10px;">Remove</button></div>');
// 		// <button id="removeSchoolClass" type="button" style="margin-left: 10px;">Remove</button></div>');
// 		$('"#myClass'+i+ '"').attr('name', 'course_code');
// 		console.log(i);
// 		// return false;
// 	});

// 	$('"#removeSchoolClass'+i+'"').click(function () {
// 		alert('hi');
// 		// $('"#myClass'+i+ '"').remove();
// 	});

// });

$(document).ready(function() {

	var max_fields      = 6; //maximum input boxes allowed
	var wrapper   		= $(".input_fields_wrap"); //Fields wrapper
	var add_button      = $(".add_field_button"); //Add button ID
	// var i = $('#schoolClasses').size();
	// var size = $(wrapper).size();
	var size = 1; //initlal text box count
	console.log("size", size);
	var maximumClassesReachedErrorMsg = "<p class='redText' id='errorMsg'>Reached maximum number of classes</p>";
	$("#errorMsg").append(maximumClassesReachedErrorMsg);
	$("#errorMsg").hide();
	$(add_button).click(function(e){ //on add input button click
		e.preventDefault();
		if(size < max_fields){ //max input box allowed
			size++; //text box increment
			// $(wrapper).append('<div> ' + x + '<input type="text" name="mytext[]"/><a href="#" class="remove_field">Remove</a></div>'); //add input box
			// $(wrapper).append('<div> ' + x + '. <input type="text" name="subj_code" class="formContentSmaller"/><input type="text" name="courseNum[]" class="formContentSmaller"/><input type="text" name="section_code[]" class="formContentSmaller"/> <button type="button" class="remove_field formButtonSmall redBG">Remove</button></div>');
			$(wrapper).append('<div><input type="text" name="subj_code" class="formContentSmaller" placeholder="Subject Code"/><input type="text" name="courseNum[]" class="formContentSmaller" placeholder="Course Code"/><input type="text" name="section_code[]" class="formContentSmaller" placeholder="Section Code"/> <button type="button" class="remove_field formButtonSmall redBG">Remove</button></div>');
		}

		console.log("size", size);
		if(size >= max_fields){
			// $(wrapper).append(maximumClassesReachedErrorMsg);
			$("#errorMsg").show();
		}
	});
	
	$(wrapper).on("click",".remove_field", function(e){ //user click on remove text
		e.preventDefault(); 
		$(this).parent('div').remove(); size--;
		console.log("size", size);
		if(size < max_fields){
			$("#errorMsg").hide();
		}
	})
});