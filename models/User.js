// access db
var db = require('../db/config/config');
var dateTime = require('node-datetime');
var dt = dateTime.create();
var formattedDT = dt.format('Y-m-d H:M:S');
var formattedDate = dt.format('m-d-Y');
var formattedTime = dt.format('H:M:S');

module.exports = {
    test: function() {
        console.log("test");
    },
    // Return a new promise for finding a single user
    findOne: function(user) {
        this.test();
        this.loadAllMessages();
        console.log("findOne")
        console.log(user)
        console.log(user.username)
        var username = user.username;
        return new Promise((resolve, reject) => {
            const queryString = 'SELECT * FROM Users WHERE username=?';
            db.query(queryString, username, (err, res) => {
                // console.log(err, res, "hello");
                if (err) {
                    // send back an error
                    console.log("found an error");
                    reject(err);
                } else {
                    if (res.length) {
                        // found a user with username that was passed in
                        resolve(res[0]);
                    } else {
                        // did not find a user with username
                        resolve(false);
                    }
                }
            });
        });
    },
    registerNewUser: function(user) {
        console.log("User.js -> registerNewUser");
        console.log(user);
        //const queryString = 'INSERT INTO Users(username, password) VALUES (' + user.username + ', ' + user.pword + ')';
        return new Promise((resolve, reject) => {
            const queryString = "INSERT INTO Users(username,password) VALUES ('" + user.username + "',  '" + user.pword + "')";
            //  const queryString = 'INSERT INTO Users(username, password) VALUES ('" + user.username + "', '" + user.pword + "')';
            db.query(queryString, (err, res) => {
                // console.log(err, res, "hello");
                if (err) {
                    // send back an error
                    console.log("found an error");
                    reject(err);
                } else {
                    if (res.length) {
                        // found a user with username that was passed in
                        // console.log("Succesfully inserted");
                        resolve(false);
                        console.log(res);

                    } else {
                        // did not find a user with username
                        // console.log("username taken");
                        console.log("Succesfully inserted");
                        resolve(res[0]);
                    }
                }
            });
        });
    },
    sendMessage: function(formData, user) {
        console.log("User.js -> sendMessage");
        console.log("there is a user: ");
        console.log("user: " + user);
        console.log("message: " + formData.message);
        message = formData.message;
        console.log(this.findOne(user));
        var foundUser = this.findOne(user);
        var currentUserID = 0;

        return new Promise((resolve, reject) => {
            console.log("User.js -> Promise -> (1) sendMessage");
            // const queryString = "INSERT INTO Chats(sender_username,message) VALUES ('"+user.username+"',  '"+user.message+"')";
            // const queryString = 'INSERT INTO Users(username, password) VALUES ('" + user.username + "', '" + user.pword + "')';
            const queryString = 'SELECT id FROM Users WHERE username=?';
            console.log(queryString);

            db.query(queryString, user, (err, res) => {
                // console.log(err, res, "queryString");

                if (err) {
                    // send back an error
                    console.log("found an error");
                    reject(err);
                } else {
                    if (res.length) {
                        // found a user with username that was passed in
                        console.log("username found");
                        console.log(res);
                        console.log(typeof res);
                        console.log(res[0].id);
                        currentUserID = res[0].id;
                        return new Promise((resolve, reject) => {
                            console.log("User.js -> Promise -> (2) sendMessage");
                            const queryString = "INSERT INTO Messages(sender_ID, sender_username,message,DATESTAMP,TIMESTAMP) VALUES ( '" + currentUserID + "', '" + user + "',  '" + message + "', '" + formattedDate + "', '" + formattedTime + "')";
                            //   const queryString = 'INSERT INTO Users(username, password) VALUES ('" + user.username + "', '" + user.pword + "')';
                            // const queryString = 'SELECT * FROM Users WHERE username="jassy"';
                            db.query(queryString, (err, res) => {
                                console.log(err, res, "queryString");
                                if (err) {
                                    // send back an error
                                    console.log("found an error");
                                    reject(err);
                                } else {
                                    if (res.length) {
                                        // found a user with username that was passed in
                                        
                                        resolve(false);
                                        console.log(res);
                                        // console.log("res.length");

                                    } else {
                                        console.log("Succesfully inserted into Chats Table");
                                        resolve(res[0]);
                                    }
                                }
                            });
                        });
                        // resolve(false);

                    } else {
                        // did not find a user with username
                        resolve(res[0]);
                    }
                }
            });
        });
    },
    loadAllMessages: function() {
        console.log("loadAllMessages");

        return new Promise((resolve, reject) => {
            const queryString = 'SELECT * FROM Messages';
            db.query(queryString, (err, res) => {
                // console.log(res, "loadAllMessages res");

                if (err) {
                    // send back an error
                    console.log("found an error");
                    reject(err);
                } else {
                    if (res.length) {
                        // found a user with username that was passed in
                        console.log("res.length");
                        resolve(res);
                    } else {
                        // did not find a user with username
                        console.log("ELSEEEE");
                        resolve(false);
                    }
                }
            });
        });
    },
    getUser: function(username) {
        console.log("getUser");

        return new Promise((resolve, reject) => {
            const queryString = 'SELECT * FROM Users WHERE username=?';
            db.query(queryString, username, (err, res) => {
                // console.log(err, res, "hello");
                if (err) {
                    // send back an error
                    console.log("found an error");
                    reject(err);
                } else {
                    if (res.length) {
                        // found a user with username that was passed in
                        resolve(res[0]);
                    } else {
                        // did not find a user with username
                        resolve(false);
                    }
                }
            });
        });
    },
    getUserList: function() {
        console.log("getUserList");

        return new Promise((resolve, reject) => {
            const queryString = 'SELECT * FROM Users';
            db.query(queryString, (err, res) => {
                // console.log(res, "loadAllMessages res");

                if (err) {
                    // send back an error
                    console.log("found an error");
                    reject(err);
                } else {
                    if (res.length) {
                        // found a user with username that was passed in
                        console.log("res.length");
                        resolve(res);
                    } else {
                        // did not find a user with username
                        console.log("ELSEEEE");
                        resolve(false);
                    }
                }
            });
        });
    },
    getUserEnrollmentInfo: function(username) {
        console.log("getUserEnrollmentInfo");

        return new Promise((resolve, reject) => {
            const queryString = 'SELECT * from Enrollments WHERE student_id = (SELECT id from Users WHERE username =?)';
            db.query(queryString, username, (err, res) => {
                // console.log(err, res, "hello");
                if (err) {
                    // send back an error
                    console.log("found an error");
                    reject(err);
                } else {
                    if (res.length) {
                        // found an enrollment with username that was passed in
                        resolve(res);
                    } else {
                        // did not find a user with username
                        resolve(false);
                    }
                }
            });
        });
    },
    findStudyBuddyForAClass: function(enrollment) {
        console.log("findStudyBuddyForAClass");
        console.log(enrollment);
        console.log(enrollment.subject);
        console.log(enrollment.course_code);
        console.log(enrollment.course_section);

        var filter = [enrollment.subject, enrollment.course_code, enrollment.course_section];

        return new Promise((resolve, reject) => {
            '" + user.username + "'
            const queryString = 'SELECT fname from Users WHERE id in (SELECT student_id from Enrollments WHERE subject_code=? AND course_number=? AND course_section=?);';
            // const queryString = 'SELECT * from Enrollments WHERE subject_code='" + user.username + "'';
            db.query(queryString, filter, (err, res) => {
                // console.log(err, res, "hello");
                if (err) {
                    // send back an error
                    console.log("found an error");
                    reject(err);
                } else {
                    if (res.length) {
                        // found an enrollment with username that was passed in
                        resolve(res);
                    } else {
                        // did not find a user with username
                        resolve(false);
                    }
                }
            });
        });
    },
    findStudyBuddyForAClassFirst1Field: function(enrollment) {
        console.log("findStudyBuddyForAClass");
        console.log(enrollment);
        console.log(enrollment.subject);
        // console.log(enrollment.course_code);
        // console.log(enrollment.course_section);

        var filter = [enrollment.subject];

        return new Promise((resolve, reject) => {
            // '" + user.username + "'
            const queryString = 'SELECT fname from Users WHERE id in (SELECT student_id from Enrollments WHERE subject_code=?);';
            // const queryString = 'SELECT * from Enrollments WHERE subject_code='" + user.username + "'';
            db.query(queryString, filter, (err, res) => {
                // console.log(err, res, "hello");
                if (err) {
                    // send back an error
                    console.log("found an error");
                    reject(err);
                } else {
                    if (res.length) {
                        // found an enrollment with username that was passed in
                        resolve(res);
                    } else {
                        // did not find a user with username
                        resolve(false);
                    }
                }
            });
        });
    },
    findStudyBuddyForAClassFirst2Fields: function(enrollment) {
        console.log("findStudyBuddyForAClass");
        console.log(enrollment);
        console.log(enrollment.subject);
        console.log(enrollment.course_code);
        // console.log(enrollment.course_section);

        var filter = [enrollment.subject, enrollment.course_code];

        return new Promise((resolve, reject) => {
            '" + user.username + "'
            const queryString = 'SELECT fname from Users WHERE id in (SELECT student_id from Enrollments WHERE subject_code=? AND course_number=?);';
            // const queryString = 'SELECT * from Enrollments WHERE subject_code='" + user.username + "'';
            db.query(queryString, filter, (err, res) => {
                // console.log(err, res, "hello");
                if (err) {
                    // send back an error
                    console.log("found an error");
                    reject(err);
                } else {
                    if (res.length) {
                        // found an enrollment with username that was passed in
                        resolve(res);
                    } else {
                        // did not find a user with username
                        resolve(false);
                    }
                }
            });
        });
    },
    findStudyBuddyForAClassAllFields: function(enrollment) {
        console.log("findStudyBuddyForAClass");
        console.log(enrollment);
        console.log(enrollment.subject);
        console.log(enrollment.course_code);
        console.log(enrollment.course_section);

        var filter = [enrollment.subject, enrollment.course_code, enrollment.course_section];

        return new Promise((resolve, reject) => {
            // '" + user.username + "'
            const queryString = 'SELECT fname from Users WHERE id in (SELECT student_id from Enrollments WHERE subject_code=? AND course_number=? AND course_section=?);';
            // const queryString = 'SELECT * from Enrollments WHERE subject_code='" + user.username + "'';
            db.query(queryString, filter, (err, res) => {
                // console.log(err, res, "hello");
                if (err) {
                    // send back an error
                    console.log("found an error");
                    reject(err);
                } else {
                    if (res.length) {
                        // found an enrollment with username that was passed in
                        resolve(res);
                    } else {
                        // did not find a user with username
                        resolve(false);
                    }
                }
            });
        });
    },
    loadClassFeedback: function(query) {
        console.log("loadClassFeedback");
        console.log("query.subjCodeH4: ", query.subject);
        console.log("query.courseNumH4: " , query.course_code);
        var filter = [query.subject, query.course_code];
        return new Promise((resolve, reject) => {
            const queryString = 'SELECT * FROM ClassFeedback WHERE subject_code=? AND course_number=?';
            db.query(queryString, filter, (err, res) => {
                // console.log(res, "loadAllMessages res");

                if (err) {
                    // send back an error
                    console.log("found an error");
                    reject(err);
                } else {
                    if (res.length) {
                        // found a user with username that was passed in
                        console.log("res.length");
                        resolve(res);
                    } else {
                        // did not find a user with username
                        console.log("ELSEEEE");
                        resolve(false);
                    }
                }
            });
        });
    },
    postFeedback: function(query) {
        console.log("loadClassFeedback");
        console.log("query.subjCodeH4: ", query.subject);
        console.log("query.courseNumH4: " , query.course_code);
        var filter = [query.subject, query.course_code];
        return new Promise((resolve, reject) => {
            // INSERT INTO ClassFeedback(sender_username, subject_code, course_number, feedback) VALUES("jassycodes","CPSC", "310", "it's a great class!");
            const queryString = const queryString = "INSERT INTO ClassFeedback(sender_username, subject_code, course_number, feedback, ,DATESTAMP,TIMESTAMP) VALUES ( '" + query.username + "', '" + query.course_code + "', '" + feedback + "', '" + formattedDate + "', '" + formattedTime + "')";

            db.query(queryString, (err, res) => {
                // console.log(res, "loadAllMessages res");

                if (err) {
                    // send back an error
                    console.log("found an error");
                    reject(err);
                } else {
                    if (res.length) {
                        // found a user with username that was passed in
                        console.log("res.length");
                        resolve(res);
                    } else {
                        // did not find a user with username
                        console.log("ELSEEEE");
                        resolve(false);
                    }
                }
            });
        });
    },

}