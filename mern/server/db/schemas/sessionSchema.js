const mongoose = require('mongoose')
const User = require('./userSchema.js')

const SessionSchema = new mongoose.Schema({
    session_token: {
        type: String,
        trim: true
    }, 
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    
    },

    
  
}, { timestamps: true })




module.exports = mongoose.model('Session', SessionSchema)
