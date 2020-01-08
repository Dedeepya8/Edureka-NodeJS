var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var bugModel = new Schema({
    title:{type:String},
    description:{type:String},
    date:{type:Date},
    assignee:{type:String}
});

module.exports = mongoose.model('bug', bugModel, 'buglist');