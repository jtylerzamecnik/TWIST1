const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Room = new mongoose.Schema({
  roomNum: {type:String, required: true, trim:true, default:''},
  building: {type:String, required:true, trim: true, default:''},
  capacity: {type: Number, required:true, trim: true, default:''}
})

// Virtual for room's url
Room
.virtual('url')
.get(function (){
  return '/admin/rooms/' + this._id;
});

// Virtual for room's update url
Room
.virtual('urlUpdate')
.get(function (){
  return '/admin/rooms/' + this._id + '/update';
});

// Virtual for room's delete url
Room
.virtual('urlDelete')
.get(function (){
  return '/admin/rooms/' + this._id + '/delete';
});


module.exports = mongoose.model('Room', Room)