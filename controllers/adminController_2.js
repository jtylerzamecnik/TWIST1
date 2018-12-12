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

exports.sessions_list_get = (req, res) => {
  Session.find({})
  .sort({sessionNum:'asc'})
  .then((results, err) => {
    if(err){
      res.render('error', {errors: err});
    } else {
      res.render('admin_sessions_list', {sessions: results})
    }
  })
}

exports.sessions_detail_get = (req, res) => {

  Session.findById(req.params.id)
  .then((results, err) => {
    if(err){
      res.render('error', {errors: err});
    } else {
      res.render('admin_sessions_detail', {sessions: results})
    }
  })
}

exports.sessions_create_get = (req, res) => {
  res.render('admin_sessions_create');
}

exports.sessions_create_post = [

  body('sessionNumber', 'Please enter the Room Number.').isLength({ min: 1 }).trim(),
  body('time', 'Please enter the Building.').isLength({ min: 1 }).trim(),
  
  sanitizeBody('sessionNumber').trim().escape(),
  sanitizeBody('time').trim().escape(),

  (req, res) => {

    var session_create = new Session({
      sessionNumber: req.body.sessionNumber,
      time: req.body.time,
    })

    Session.create(session_create)
    .then((results, err) => {
      if(err){
        res.render('error', {errors: err});
      } else {
        res.render('admin_sessions_detail', {sessions: session_create})
      }
    })
  }
]

exports.sessions_update_get = (req, res) => {

  Session.findById(req.params.id)
  .then((results, err) => {
    if(err){
      res.render('error', {errors: err});
    } else {
      res.render('admin_sessions_update', {sessions: results})
    }
  })
}

exports.sessions_update_post = [

  body('sessionNumber', 'Please enter the Room Number.').isLength({ min: 1 }).trim(),
  body('time', 'Please enter the Building.').isLength({ min: 1 }).trim(),
  
  sanitizeBody('sessionNumber').trim().escape(),
  sanitizeBody('time').trim().escape(),

  (req, res) => {

    var session_create = new Session({
      sessionNumber: req.body.sessionNumber,
      time: req.body.time,
      _id: req.params.id
    })

    Session.findByIdAndUpdate(req.params.id, session_create)
    .exec((err) => {
      if(err){
        res.render('error', {errors: err});
      } else {
        res.render('admin_sessions_detail', {sessions: session_create})
      }
    })
  }
]

exports.sessions_delete_get = (req, res) =>{

  Session.findById(req.params.id)
  .then((results, err) => {
    if(err){
      res.render('error', {errors: err});
    } else {
      res.render('admin_sessions_delete', {sessions: results})
    }
  })
}

exports.sessions_delete_post = (req, res) => {

  Session.findByIdAndDelete(req.params.id)
  .exec((err) => {
    if(err){
      res.render('error', {errors: err});
    } else {
      res.redirect('/admin/sessions');
    }
  })
}




// SCHEDULES //

exports.schedules_list_get = (req, res) => {
  Schedule.find({})
  .populate('session')
  .populate('room')
  .populate('topic')
  .then((results, err) => {
    if(err){
      res.render('error', {errors: err});
    } else {
      res.render('admin_schedules_list', {schedules: results})
    }
  })
}

exports.schedules_detail_get = (req, res) => {

  Schedule.findById(req.params.id)
  .populate('session')
  .populate('room')
  .populate('topic')
  .then((results, err) => {
    if(err){
      res.render('error', {errors: err});
    } else {
      res.render('admin_schedules_detail', {schedules: results})
    }
  })
}

exports.schedules_create_get = (req, res, next) => {

  async.parallel({
    sessions: (callback) => {
      Session.find({})
      .exec(callback)
    },
    rooms: (callback) => {
      Room.find({})
      .exec(callback)
    },
    topics: (callback) => {
      Topic.find({})
      .exec(callback)
    }
  },
    function(err, results){
      if(err){
        return next(err);
      } else {
        res.render('admin_schedules_create', {sessions: results.sessions, rooms: results.rooms, topics: results.topics});
      }
  })
  
}

exports.schedules_create_post = [

  body('session', 'Please choose a Session.').isLength({ min: 1 }).trim(),
  body('room', 'Please choose a Room.').isLength({ min: 1 }).trim(),
  body('topic', 'Please choose a Topic.').isLength({ min: 1 }).trim(),
  
  sanitizeBody('session').trim().escape(),
  sanitizeBody('room').trim().escape(),
  sanitizeBody('topic').trim().escape(),

  (req, res) => {

    var schedule_create = new Schedule({
      session: req.body.session,
      room: req.body.room,
      topic: req.body.topic,
    })

    Schedule.create(schedule_create)
    .then((results, err) => {
      if(err){
        res.render('error', {errors: err});
      } else {
        Schedule.findById(schedule_create._id)
        .populate('session')
        .populate('room')
        .populate('topic')
        .then((results, err) => {
          if(err){
            res.render('error', {errors: err});
          } else {
            res.render('admin_schedules_detail', {schedules: results})
          }
        })
      }
    })
  }
]

exports.schedules_update_get = (req, res) => {

  async.parallel({

    schedules: (callback) => {
      Schedule.findById(req.params.id)
      .populate('session')
      .populate('room')
      .populate('topic')
      .exec(callback)
    },
    sessions: (callback) => {
      Session.find({})
      .sort({sessionNum: 'asc'})
      .exec(callback)
    },
    rooms: (callback) => {
      Room.find({})
      .sort({roomNum:'asc'})
      .exec(callback)
    },
    topics: (callback) => {
      Topic.find({})
      .sort({title: 'asc'})
      .exec(callback)
    },
    function(err, results){
      if(err){
        res.render('error', {errors: err})
      } else {
        res.render('admin_schedules_create', {schedules: results.schedules, sessions: results.sessions, rooms: results.rooms, topics: results.topics});
      }
    }
  })
}

exports.schedules_update_post = [

  body('session', 'Please choose a Session.').isLength({ min: 1 }).trim(),
  body('room', 'Please choose a Room.').isLength({ min: 1 }).trim(),
  body('topic', 'Please choose a Topic.').isLength({ min: 1 }).trim(),
  
  sanitizeBody('session').trim().escape(),
  sanitizeBody('room').trim().escape(),
  sanitizeBody('topic').trim().escape(),

  (req, res) => {

    var schedule_update = new Schedule({
      session: req.body.session,
      room: req.body.room,
      topic: req.body.topic,
      _id: req.params.id
    })

    Schedule.create(schedule_update)
    .then((results, err) => {
      if(err){
        res.render('error', {errors: err});
      } else {
        Schedule.findById(req.params.id)
        .populate('session')
        .populate('room')
        .populate('topic')
        .then((results, err) => {
          if(err){
            res.render('error', {errors: err});
          } else {
            res.render('admin_schedules_detail', {schedules: results})
          }
        })
      }
    })
  }
]

exports.schedules_delete_get = (req, res) =>{

  Schedule.findById(req.params.id)
  .populate('session')
  .populate('room')
  .populate('topic')
  .then((results, err) => {
    if(err){
      res.render('error', {errors: err});
    } else {
      res.render('admin_schedules_delete', {schedules: results})
    }
  })
}

exports.schedules_delete_post = (req, res) => {

  Session.findByIdAndDelete(req.params.id)
  .exec((err) => {
    if(err){
      res.render('error', {errors: err});
    } else {
      res.redirect('/admin/schedules');
    }
  })
}