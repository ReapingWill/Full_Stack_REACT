const mongoose = require('mongoose')

const AgentSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true,
        required: true
    },
    last_name: {
        type: String,
        trim: true,
        required: true
    },

    region: {
        type: String,
        enum:{
            values:['north', 'south', 'east', 'west'],
            message: '{VALUE} is not supported'
        },
        required: true

    },
    rating: {
        type: Number,
        min: 0,
        max: 100
    },
    fee: {
        type: Number,
        min: 0
    },
  
}, { timestamps: true })




module.exports = mongoose.model('Agent', AgentSchema)
