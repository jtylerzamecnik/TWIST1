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

exports.main =  function(req, res, next){
  res.render('index', {});
};

exports.topic_list_get = function(req, res, next){

  Topic.find({})
  .sort({name: 'asc'})
  .then(function(topics, err){
    if(err){
      res.render('error', {error: err});
    } else {
      res.render('topic_list', {topics});
    }
  })
}

exports.topic_detail_get = function(req, res, next){

  Topic.findById(req.params.id)
  .then(function(topic, err){
    if(err){
      res.render('error', {error: err});
    } else {
      res.render('topic_detail', {topic});
    }
  })
}