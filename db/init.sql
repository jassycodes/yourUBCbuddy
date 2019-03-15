-- DROP DATABASE chatapp;

CREATE DATABASE IF NOT EXISTS studybuddy;

USE studybuddy;

DROP TABLE IF EXISTS Enrollments;
DROP TABLE IF EXISTS Messages;
DROP TABLE IF EXISTS Classes;
DROP TABLE IF EXISTS Courses;
DROP TABLE IF EXISTS Subjects;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users(
  id INT AUTO_INCREMENT UNIQUE NOT NULL,
  username VARCHAR(15) UNIQUE,
  fname VARCHAR(255),
  lname VARCHAR(255),
  password VARCHAR(15),
  email VARCHAR(50),
  PRIMARY KEY (id)
);

-- INSERT INTO Users(username,fname,lname,password,email) VALUES("jassycodes","Jasmine","Bayani","polygloter","jassycodes@gmail.com");
-- INSERT INTO Users(username,fname,lname,password,email) VALUES("janedoe","Jane","Doe","polygloter11","janedoe@gmail.com");

CREATE TABLE Subjects(
  code VARCHAR(4) UNIQUE NOT NULL,
  title VARCHAR(30),
  faculty VARCHAR(30),
  PRIMARY KEY (code)
);

-- INSERT INTO Subjects VALUES("CPSC","Computer Science", "Faculty of Science");

CREATE TABLE Courses(
  id INT AUTO_INCREMENT UNIQUE NOT NULL,
  name VARCHAR(30),
  title VARCHAR(50),
  subject_code VARCHAR(4),
  course_number VARCHAR(30),
  PRIMARY KEY (id),
  FOREIGN KEY (subject_code) REFERENCES SUBJECTS(code)
);

-- INSERT INTO Courses(name,title,subject_code,course_number) VALUES("CPSC 310","Introduction to Software Engineering", "CPSC", "310");

CREATE TABLE Classes(
  id INT AUTO_INCREMENT UNIQUE NOT NULL,
  year VARCHAR(4),
  season VARCHAR(6),
  term VARCHAR(1),
  course_ID INT,
  course_section VARCHAR(4),
  PRIMARY KEY (id),
  FOREIGN KEY (course_ID) REFERENCES COURSES(id)
);

-- INSERT INTO Classes(year,season,term,course_ID,course_section) VALUES("2018", "WINTER", "2", 1, "101");

CREATE TABLE Enrollments(
  id INT AUTO_INCREMENT UNIQUE NOT NULL,
  student_id INT,
  subject_code VARCHAR(4),
  course_number VARCHAR(30),
  course_section VARCHAR(4),
  PRIMARY KEY (id),
  FOREIGN KEY (student_id) REFERENCES USERS(id)
);

-- ALTER TABLE ENROLLMENTS MODIFY subject_code VARCHAR(50);


CREATE TABLE ClassFeedback(
  id INT AUTO_INCREMENT NOT NULL, 
  sender_id INT,
  sender_username VARCHAR (15),
  subject_code VARCHAR(4),
  course_number VARCHAR(30),
  feedback VARCHAR(1000),
  timestamp VARCHAR(8),
  datestamp VARCHAR(10),
  PRIMARY KEY (id),
  FOREIGN KEY (sender_id) REFERENCES USERS(id),
  FOREIGN KEY (sender_username) REFERENCES USERS(username)
);

-- INSERT INTO Enrollments(student_id, subject_code, course_number, course_section) VALUES(1,"CPSC", "310", "101");
-- INSERT INTO Enrollments(student_id, subject_code, course_number, course_section) VALUES(2,"CPSC", "310", "101");
-- INSERT INTO Enrollments(student_id, subject_code, course_number, course_section) VALUES(3, "CPSC", "310", "102");

-- SELECT * FROM ENROLLMENTS;
-- SELECT * from Enrollments WHERE subject_code="CPSC";
-- SELECT * from Enrollments WHERE subject_code="CPSC" AND course_number="310";
-- SELECT * from Enrollments WHERE subject_code="CPSC" AND course_number="310" AND course_section="101";

-- CREATE TABLE Enrollments(
--   id INT AUTO_INCREMENT UNIQUE NOT NULL,
--   student_id INT,
--   class_id INT,
--   PRIMARY KEY (id),
--   FOREIGN KEY (student_id) REFERENCES USERS(id),
--   FOREIGN KEY (class_id) REFERENCES CLASSES(id)
-- );

-- INSERT INTO Enrollments(student_id,class_id) VALUES(1,1);


CREATE TABLE Messages(
  id INT AUTO_INCREMENT NOT NULL, 
  sender_id INT,
  sender_username VARCHAR (15),
  receiver_id INT,
  receiver_username VARCHAR (15),
  message VARCHAR(300),
  timestamp VARCHAR(8),
  datestamp VARCHAR(10),
  PRIMARY KEY (id),
  FOREIGN KEY (sender_id) REFERENCES USERS(id),
  FOREIGN KEY (sender_username) REFERENCES USERS(username),
  FOREIGN KEY (receiver_id) REFERENCES USERS(id),
  FOREIGN KEY (receiver_username) REFERENCES USERS(username)
);

-- CREATE TABLE Meetings(
--   id INT AUTO_INCREMENT NOT NULL, 
--   creator_id INT,
--   creator_username VARCHAR (15),
--   meeting_date VARCHAR(10),
--   time_created VARCHAR(8),
--   date_created VARCHAR(10),
--   PRIMARY KEY (id),
--   FOREIGN KEY (creator_id) REFERENCES USERS(id),
--   FOREIGN KEY (creator_username) REFERENCES USERS(username)
-- );

#ALTER TABLE CHATS ADD TIMESTAMP TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
#ALTER TABLE "table_name" DROP "column_name";