$(document).ready(function() {

	var max_fields      = 6; //maximum input boxes allowed
	var wrapper   		= $(".input_fields_wrap"); //Fields wrapper
	var add_button      = $(".add_field_button"); //Add button ID
	// var myObject = new Object();
	// var myObject.subj_codeLIST;
	// var myObject.course_codeLIST;
	// var myObject.section_codeLIST;
	var subj_codeLIST;
	var subj_codeARR = [];
	var course_codeLIST;
	var course_codeARR = [];
	var section_codeLIST;
	var section_codeARR = [];
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
			$(wrapper).append('<div><input type="text" name="subj_code[]" class="formContentSmaller" placeholder="Subject Code"/><input type="text" name="course_code[]" class="formContentSmaller" placeholder="Course Code"/><input type="text" name="section_code[]" class="formContentSmaller" placeholder="Section Code"/> <button type="button" class="remove_field formButtonSmall redBG">Remove</button></div>');
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

	// $('#save').click(function (){
	function save(){	
		subj_codeLIST = $("input[name='subj_code[]']")
			  .map(function(){return $(this).val();}).get();
		course_codeLIST = $("input[name='course_code[]']")
			  .map(function(){return $(this).val();}).get();
		section_codeLIST = $("input[name='section_code[]']")
			  .map(function(){return $(this).val();}).get();
	}
		// alert(values);
	// });

	// $('#show').click(function (){
	function show(){
		console.log("subj_codeLIST", subj_codeLIST);
		console.log("course_codeLIST", course_codeLIST);
		console.log("section_codeLIST", section_codeLIST);
		console.log("type of subj_codeLIST", typeof(subj_codeLIST));

		$.each(subj_codeLIST, function (index, value) 
		{
			console.log(value);
			subj_codeARR.push(value);
			// Will stop running after "three"
		// return (value !== 'three');
		});
	}
	// });


	$('#submit').click(function (){
		save();
		show();


		// for ( var i = 0, l = subj_codeLIST.length; i < l; i++ ) {
  //   		console.log("subj_codeLIST[i]" + i , subj_codeLIST[i]);
		// }

		function createJSON() {
			jsonObj = [];
			// $("input[class=email]").each(function() {

				// var id = $(this).attr("title");
				// var email = $(this).val();
			for ( var i = 0, l = subj_codeLIST.length; i < l; i++ ) {
				item = {}
				item["subjectCode"] = subj_codeLIST[i];
				item["courseCode"] = course_codeLIST[i];
				item["sectionCode"] = section_codeLIST[i];

				jsonObj.push(item);
			}
			// });

			console.log(jsonObj);
			return jsonObj;
		}

		var classesData = createJSON();
		console.log("classesData:", typeof(classesData));

		$.ajax({
		    url: '/user/saveClasses', 
		    type: 'POST', 
		    contentType: 'application/json', 
		    // data: JSON.stringify({number:1})
		    data: JSON.stringify(classesData),
		    success: function(response){
		    	console.log(response);
		    	window.location.replace('http://localhost:9000/user/profile/me');
		    },
			error: function(error) {
				console.log(error);
			}
		})
	});

});