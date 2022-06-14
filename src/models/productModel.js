const mongoose = require('mongoose');

const productSchema = new mongoose.Schema( {
    productName: String, 
     
    category: String,
    
    prices: {
        type: Number,
        require: true
    } 
    

}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema) //products
