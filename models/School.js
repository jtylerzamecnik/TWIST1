const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const School = new mongoose.Schema({
  name: {type:String, trim:true, default:''}
})

// Virtual for School's url
School
.virtual('url')
.get(function (){
  return '/admin/schools/' + this._id;
});

// Virtual for School's update url
School
.virtual('urlUpdate')
.get(function (){
  return '/admin/schools/' + this._id + '/update';
});

// Virtual for School's delete url
School
.virtual('urlDelete')
.get(function (){
  return '/admin/schools/' + this._id + '/delete';
});

module.exports = mongoose.model('School', School)