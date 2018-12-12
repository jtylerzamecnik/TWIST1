const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Schedule = new mongoose.Schema({
  session: {type:Schema.Types.ObjectId, ref:'Session'}, 
  room: {type: Schema.Types.ObjectId, ref: 'Room'},
  topic: {type: Schema.Types.ObjectId, ref: 'Topic'},
})

// Virtual for Schedule's url
Schedule
.virtual('url')
.get(function (){
  return '/admin/schedules/' + this._id;
});

// Virtual for Schedule's update url
Schedule
.virtual('urlUpdate')
.get(function (){
  return '/admin/schedules/' + this._id + '/update';
});

// Virtual for Schedule's delete url
Schedule
.virtual('urlDelete')
.get(function (){
  return '/admin/schedules/' + this._id + '/delete';
});

module.exports = mongoose.model('Schedule', Schedule)