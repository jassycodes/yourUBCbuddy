$(document).ready(function(){

	Object.size = function(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	};

	var subjectCode;

	$('#searchForUBCClassesButton').click(function() {
		// console.log(response);
		subjectCode = $("#subjectCode").val();
		console.log(subjectCode);
		fetchClasses(subjectCode);
	});
	// console.log("subjectCode", subjectCode);

	function fetchClasses(subjectCode){
		var getURL = 'https://ubc-courses-api.herokuapp.com/tree/2018W/' + subjectCode + '/';
		console.log(getURL);
		$.ajax({
			type: "GET",
					url: getURL,
					data: $('#successget').serialize(),
					success: function(response) {
						console.log(response);
						console.log(response.code);
						console.log(response.courses);
						console.log(response.courses[0]);
						console.log("type of response.courses[0]", typeof(response.courses[0]));
						var size = Object.size(response.courses[0]);
						console.log("size: ", size);
						var courseName;
						$("#UBC-classes").empty();
							for (key in response.courses[0]) {
								if (response.courses[0].hasOwnProperty(key)){
									courseName = response.courses[0][key].course_name;
									courseTitle = response.courses[0][key].course_title;
									courseDescription = response.courses[0][key].description;
									courseCredits = response.courses[0][key].credits;
									console.log(courseName);
									var trimmed = courseName.replace(/\s/g,'')
									$("#UBC-classes").append("<b>" + courseName + "</b>" + " - " + courseTitle + "<br>");
									$("#UBC-classes").append("<i>Description: </i>" + courseDescription + "<br>");
									$("#UBC-classes").append("<i>Credits: " + courseCredits + "</i><br>");
									$("#UBC-classes").append("<p id='" + trimmed +"'> Placeholder</p>");
									$("#UBC-classes").append("<p id='moreInfo'>Here is more info</p>");
									$("#moreInfo").hide();
									$("#UBC-classes").append("<button type='button' id='showInfo'> More Info </button>");
									// $("#moreInfo").append("Here is more info");
									// console.log($("#moreInfo").val());
									// $("#UBC-classes").append();
									// $("#UBC-classes")
									
									console.log(trimmed);
									var toggleStr = trimmed;
									// var toggleStr = '"#'+ trimmed + '"';
									console.log(trimmed);
									$(toggleStr).hide();
									$("#UBC-classes").append("<br>");
									$("#showInfo").click(function(){
										// alert("showing info..");
			   							$("#moreInfo").toggle();
			   							// console.log(toggleStr);
			   							$("#"+ trimmed).toggle();
									});
								}
							}
					},
							error: function(error) {
									console.log(error);
					}
			});
	}

});