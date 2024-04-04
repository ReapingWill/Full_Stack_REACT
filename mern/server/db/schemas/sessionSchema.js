const mongoose = require('mongoose')
const User = require('./userSchema.js')

const SessionSchema = new mongoose.Schema({
    session_token: {
        type: String
    }, 
    
    user: {User,schema},

    
  
}, { timestamps: true })




module.exports = mongoose.model('Session', SessionSchema)
