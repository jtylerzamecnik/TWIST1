const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var School = require('../models/School');
var Presenter = require('../models/Presenter');
var Room = require('../models/Room');
var Schedule = require('../models/Schedule');
var Session = require('../models/Session');
var Student = require('../models/Student');
var Topic = require('../models/Topic');
var async = require('async');

// Register Create Student Get Form
exports.register_get = function(req, res, next){

      School.find({})
      .sort({name: "asc"})
      .then(function(schools){
        Topic.find({})
        .sort({name: "asc"})
        .then(function(topics){
          res.render('register', {schools, topics})
        })
      })
  }

// Register Create Student Post
exports.register_post = [

  // Validate fields.
  body('firstName', 'Please enter your First Name.').isLength({ min: 1 }).trim(),
  body('lastName', 'Please enter your Last Name.').isLength({ min: 1 }).trim(),
	body('school', 'Please select your School').isLength({ min: 1 }).trim(),
	body('email', 'Please enter your E-Mail.').isLength({ min: 1 }).trim(),
	body('phone', 'Please enter your Phone Number.').isLength({ min: 1 }).trim(),
	body('choice1', 'Please make fill all choices').isLength({ min: 1 }).trim(),
	body('choice2', 'Please make fill all choices').isLength({ min: 1 }).trim(),
	body('choice3', 'Please make fill all choices').isLength({ min: 1 }).trim(),
	body('choice4', 'Please make fill all choices').isLength({ min: 1 }).trim(),
	body('choice5', 'Please make fill all choices').isLength({ min: 1 }).trim(),

  // Sanitize fields.
  sanitizeBody('firstName').trim().escape(),
  sanitizeBody('lastName').trim().escape(),
  sanitizeBody('address').trim().escape(),
  sanitizeBody('email').trim().escape(),
  sanitizeBody('phone').trim().escape(),

  function registerStudent(req, res, next){

    const errors = validationResult(req);

    Student.find({'email': req.body.email})
    .then(function(results){
      if (results){
        return 
      }
    })
    
    var student_register = new Student({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      school: req.body.school,
      email: req.body.email,
      timeStamp: new Date,
      choice1: req.body.choice1,
      choice2: req.body.choice2,
      choice3: req.body.choice3,
      choice4: req.body.choice4,
      choice5: req.body.choice5,
    })

    Student.create(student_register, function(err, thestudent){
      if (err){
        res.render('error' ,{error: err});
      }else{
        res.render('success', {thestudent});
        console.log(req.body.school);
      }
    })
  }
  
]