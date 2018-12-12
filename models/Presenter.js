const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Presenter = new mongoose.Schema({
  lastName: {type:String, trim:true, default:''},
  firstName: {type:String, trim:true, default:''},
  occupation: {type:String, trim:true, default:''},
  mainPhone: {type:String, trim:true, default:''},
  cellPhone: {type:String, trim:true, default:''},
  email:{type:String, trim:true, default:''}
})

// Virtual for Presenter's url
Presenter
.virtual('url')
.get(function (){
  return '/admin/presenters/' + this._id;
});

// Virtual for Presenter's update url
Presenter
.virtual('urlUpdate')
.get(function (){
  return '/admin/presenters/' + this._id + '/update';
});

// Virtual for Presenter's delete url
Presenter
.virtual('urlDelete')
.get(function (){
  return '/admin/presenters/' + this._id + '/delete';
});

// Virtual for Instructor's proper name
Presenter
.virtual('properName')
.get(function (){
  return this.lastName + ', ' + this.firstName;
});

module.exports = mongoose.model('Presenter', Presenter)