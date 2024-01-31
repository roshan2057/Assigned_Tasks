const mongoose = require('mongoose');

const ProductSchema= new mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    quantity:Number,
    product_type
})


const product = mongoose.model('Product',ProductSchema)

module.exports= product