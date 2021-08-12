const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },      
    address: {
        street: String,
        locality: String,
        city: String,
        state: String,
        pincode: String,
        type: { type: String },
        coordinates: [Number],
    }    
},{timestamps:true})

// indexing address eith 2dsphere
userSchema.index({ "address": "2dsphere" })

module.exports = mongoose.model('User', userSchema)
