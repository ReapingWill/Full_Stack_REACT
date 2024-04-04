const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
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

    amount: {
        type: Number,
        min: 0,
        required: true
    },

    date:{
        type: Date,
        required: true
    },
}, { timestamps: true })




module.exports = mongoose.model('Transaction', TransactionSchema)
