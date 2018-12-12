const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const moment = require('moment');

const Schema = mongoose.Schema;

const Student = new mongoose.Schema({
  lastName: {type:String, trim:true, required:true, default:''},
  firstName: {type:String, trim:true, required:true, default:''},
  school: {type: Schema.Types.ObjectId, ref: 'School'},
  email: {type:String, trim:true, required:true, unique:true, default:''},
  timeStamp: {type: Date, trim: true, required: true, default:Date.now},
  choice1: {type: Schema.Types.ObjectId,  ref: 'Topic'},
  choice2: {type: Schema.Types.ObjectId,  ref: 'Topic'},
  choice3: {type: Schema.Types.ObjectId,  ref: 'Topic'},
  choice4: {type: Schema.Types.ObjectId,  ref: 'Topic'},
  choice5: {type: Schema.Types.ObjectId,  ref: 'Topic'},
})

// Virtual for Participant's proper name
Student
.virtual('properName')
.get(function (){
  return this.lastName + ', ' + this.firstName;
});

// Virtual for Participant's full name
Student
.virtual('fullName')
.get(function (){
  return this.firstName + ' ' + this.lastName;
});

// Virtual for Student's url
Student
.virtual('url')
.get(function (){
  return '/admin/students/' + this._id;
});

// Virtual for Student's update url
Student
.virtual('urlUpdate')
.get(function (){
  return '/admin/students/' + this._id + '/update';
});

// Virtual for Student's delete url
Student
.virtual('urlDelete')
.get(function (){
  return '/admin/students/' + this._id + '/delete';
});

// Virtual to change Student's registration date and time format
Student
.virtual('register')
.get(function (){
  return moment(this.timeStamp).format('MMM DD YYYY HH:M');
});

Student.plugin(uniqueValidator, { message: 'This {PATH} has already been used' });
module.exports = mongoose.model('Student', Student)