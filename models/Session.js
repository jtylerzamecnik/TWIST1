const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Session = new mongoose.Schema({
  sessionNumber: {type:Number, trim: true, enum:[1, 2, 3, 4]},
  time: {type:String, trim:true, default:''}
})

// Virtual for Session's location
Session
.virtual('url')
.get(function (){
  return '/admin/sessions/' + this._id;
});

// Virtual for Session's update url
Session
.virtual('urlUpdate')
.get(function (){
  return '/admin/sessions/' + this._id + '/update';
});

// Virtual for Session's delete url
Session
.virtual('urlDelete')
.get(function (){
  return '/admin/sessions/' + this._id + '/delete';
});


module.exports = mongoose.model('Session', Session)