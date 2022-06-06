const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: {
        type:String,
        require:true
    },

    autherName: String,
    category: {
        type:String,
        enum:["fantacy", "fiction", "drama"]
    },
    year: Number
    
    
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema) //books



