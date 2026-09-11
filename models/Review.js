const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    reviewTitle: {
        type: String,
        required: true
    },
    reviewBody: {
        type: String,
        required: true
    }

})