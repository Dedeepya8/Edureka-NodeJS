var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var productModel = new Schema({
    id:Number,
    product: String,
    description:String,
    price:Number
});

module.exports = mongoose.model('product', productModel, 'productlist');