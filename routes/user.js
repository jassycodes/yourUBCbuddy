const express = require('express');
const router = express.Router();
const UserDB = require('../models/User');

router.get('/', function(req, res, next) {
  res.render('user');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function (req, res, next) {
	console.log("/login post")
  //expect username password
  UserDB.findOne(req.body)
  .then((user) => {

	if (user) {
	  if (req.body.pword === user.password) {
		// res.send(200, user);
		console.log("req.cookies.currentUser: ", req.cookies.currentUser);
		res.cookie('currentUser', user.username);
		console.log("req.cookies.currentUser: ", req.cookies.currentUser);
		res.redirect('/user/enter-my-classes');
		// res.redirect('/user/dashboard');
		// res.render('user', {currentUser: user.username});
		// res.render('login',{loginError: "success"});
	  } 
	  else {
		// res.send(400, {err: 'Incorrect password'});
		var loginErr = "Incorrect password";
		console.log(loginErr)
		// return 
		// res.json({loginError: "Incorrect password"});
		res.render('login',{loginError: "Incorrect password"});
	  }
	}
  })
  .catch((err) => {
	console.log("found an error", err);
	res.send(500, err);
  });

});

router.get('/enter-my-classes', function(req, res, next) {
  res.render('enterMyClasses');
});

router.get('/logout', function(req, res, next) {
  res.redirect('/user/login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

router.get('/profile/me', function(req, res, next) {
  UserDB.getUser(req.cookies.currentUser)
  .then((user) => {

	console.log("user.js -> getUser")
	console.log(user);
	userInfo = JSON.parse(JSON.stringify(user));
	console.log(userInfo.fname);
	res.render('profile', {currentUser: req.cookies.currentUser, profileUsername: userInfo.username, fname: userInfo.fname, lname: userInfo.lname, email: userInfo.email});
 
  })
  .catch((err) => {
	console.log("found an error", err);
	res.send(500, err);
  });
});

router.get('/profile/getUserEnrollmentInfo', function(req, res, next) {
  UserDB.getUserEnrollmentInfo(req.cookies.currentUser)
  .then((enrollments) => {
	console.log("user.js -> getUserEnrollmentInfo")
	// console.log(enrollments);
	enrollmentInfo = JSON.parse(JSON.stringify(enrollments));
	console.log(enrollmentInfo);

	res.send(200, enrollmentInfo);
	// res.render('profile', {currentUser: req.cookies.currentUser, profileUsername: userInfo.username, fname: userInfo.fname, lname: userInfo.lname, email: userInfo.email});
 
  })
  .catch((err) => {
	console.log("found an error", err);
	res.send(500, err);
  });
});


// router.get('/getUserProfile', function(req, res, next) {
//   UserDB.findOne(req.cookies.currentUser)
//   .then((username) => {
//   	console.log("req.cookies.currentUser: ", req.cookies.currentUser);
//   })
//   .catch((err) => {
// 	console.log("found an error", err);
// 	res.send(500, err);
//   });

// });


router.get('/find-a-study-buddy', function(req, res, next) {
	var usersMatched = "";
	var responseMsg = "";
	res.render('findastudybuddy', {usersMatched: usersMatched, responseMessage: responseMsg});
});


var list;

router.get('/findStudyBuddy', function(req, res, next) {
	console.log("list: ", list);
	// res.send(200, list);
	// res.render('user', {currentUser: req.cookies.currentUser, messagesInfo: messagesObj});

});

router.post('/findStudyBuddy', function(req, res, next) {
	console.log(req.body);
	console.log(req.body.subject);
	console.log(req.body.course_code);
	console.log(req.body.course_section);
	subj = req.body.subject;
	courseCode = req.body.course_code;
	courseSection = req.body.course_section;
	
	if(subj != "" && courseCode == "" && courseSection == ""){

		  UserDB.findStudyBuddyForAClassFirst1Field(req.body)
		  .then((users) => {
			console.log("user.js -> getUserEnrollmentInfo")
			// console.log(enrollments);
			userList = JSON.parse(JSON.stringify(users));
			console.log(userList);
			list = userList;

			var usersMatched = userList;
			var responseMsg = "Matches for: " + subj;
			res.render('findastudybuddy', {usersMatched: usersMatched, responseMessage: responseMsg});
		 
		  })
		  .catch((err) => {
			console.log("found an error", err);
			res.send(500, err);
		  });
 	}
 	else if(subj != "" && courseCode != "" && courseSection == ""){

 		  UserDB.findStudyBuddyForAClassFirst2Fields(req.body)
		  .then((users) => {
			console.log("user.js -> getUserEnrollmentInfo")
			// console.log(enrollments);
			userList = JSON.parse(JSON.stringify(users));
			console.log(userList);
			list = userList;

			var usersMatched = userList;
			var responseMsg = "Matches for: " + subj + " " + courseCode;
			res.render('findastudybuddy', {usersMatched: usersMatched, responseMessage: responseMsg});
		 
		  })
		  .catch((err) => {
			console.log("found an error", err);
			res.send(500, err);
		  });

 	}
 	else if(subj != "" && courseCode != "" && courseSection != ""){
 		  UserDB.findStudyBuddyForAClassAllFields(req.body)
		  .then((users) => {
			console.log("user.js -> getUserEnrollmentInfo")
			// console.log(enrollments);
			userList = JSON.parse(JSON.stringify(users));
			console.log(userList);
			list = userList;

			var usersMatched = userList;
			var responseMsg = "Matches for: " + subj + " " + courseCode + " " + courseSection;
			res.render('findastudybuddy', {usersMatched: usersMatched, responseMessage: responseMsg});
		 
		  })
		  .catch((err) => {
			console.log("found an error", err);
			res.send(500, err);
		  });
 	}
 	else if(subj == "" && courseCode == "" && courseSection == ""){
			var err = "No filter provided";
			var usersMatched = "";
			var responseMsg = err;
			res.render('findastudybuddy', {usersMatched: usersMatched, responseMessage: responseMsg});
 	}
 	else{
 		if(subj == "" && (courseCode != "" || courseSection != "")){
 			var err = "";
 			if(courseCode != "" && courseSection != ""){
 				err = "You must fill Subject Code Field first";
 			}
 			else if(courseCode != ""){
 				err = "You must fill in the Subject Code Field first before you fill in the Course Code Field";
 			}
 			else if(courseSection != ""){
 				err = "You must fill in the Subject Code Field first before you fill in the Course Section Field";
 			}
			var usersMatched = "";
			var responseMsg = err;

 			res.render('findastudybuddy', {usersMatched: usersMatched, responseMessage: responseMsg});
 		}
 		else if(subj == "" && courseCode == "" && courseSection != ""){
 			var err = "Nothing entered for Subject Code Field and Course Code Field";
			var usersMatched = "";
			var responseMsg = err;

 			res.render('findastudybuddy', {usersMatched: usersMatched, responseMessage: responseMsg});
 		}
 	}

});

router.get('/UBC-classes', function(req, res, next) {
  res.render('ubcClasses');
});

router.get('/UBC-class-feedback', function(req, res, next) {
  res.render('ubcClassFeedback', {feedbackRes: ""});
});

router.post('/post-class-feedback', function(req, res, next) {
  // res.render('ubcClassFeedback');
});

router.post('/load-class-feedback', function(req, res, next) {
	// console.log(req.body);
	console.log("req.body.subjectCode: ", req.body.subject);
	console.log("req.body.courseNum: ", req.body.course_code);
	subj = req.body.subject;
	courseNum = req.body.course_code;

		  UserDB.loadClassFeedback(req.body)
		  .then((feedback) => {
			console.log("user.js -> getUserEnrollmentInfo")
			// console.log(enrollments);
			feedbackObj = JSON.parse(JSON.stringify(feedback));
			console.log(feedbackObj);

			// res.re()
			// res.render('findastudybuddy', {usersMatched: usersMatched, responseMessage: responseMsg});
		 	res.render('ubcClassFeedback', {feedbackRes: feedbackObj});
		  })
		  .catch((err) => {
			console.log("found an error", err);
			res.send(500, err);
		  });

});

// router.post('/get-class-feedback', function(req, res, next) {
// 	console.log("user.js -> /get-class-feedback");
// 	console.log(req.body.courseNumH4);

// 	var feedbackObj;

// 	 UserDB.loadClassFeedback(req.body)
//   .then((feedback) => {

//   	// console.log(feedback);
//   	feedbackObj = JSON.parse(JSON.stringify(feedback));
// 	console.log("feedbackObj", feedbackObj);
// 	res.send(200, feedbackObj);
 
//   })
//   .catch((err) => {
// 	console.log("found an error", err);
// 	res.send(500, err);
//   });

//   console.log('getting messages', feedbackObj);

//   // res.render('ubcClassFeedback');
// });

module.exports = router;