const express = require('express');
const router = express.Router();

var dateTime = require('node-datetime');
var dt = dateTime.create();
var formattedDT = dt.format('Y-m-d H:M:S');
var formattedDate = dt.format('m-d-Y');
var formattedTime = dt.format('H:M:S');
console.log(formattedDT);
console.log(formattedDate);
console.log(formattedTime);


router.get('/', function(req, res, next) {
  res.render('login');
});

module.exports = router;