const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {type: String, 
            required: [true, 'Book title is required!!'],
            trim: true,
            maxLength : [100, 'Book title can not be more than 100 charaacters']},
    author: {type: String,
            required: [true, 'Book author is required!'],
            trim: true,
            maxLength: [100, 'Book author can not be more than 100 characters']},
    year: {type: Number,
           required: [true, 'Book year is required!'],
           min : [1000, 'Year must be atleast 1000'],
           max: [new Date().getFullYear(), 'Year cannot be in the future']},
    createdAt: {type: Date,
                default: Date.now}

});

module.exports = mongoose.model('book', bookSchema);