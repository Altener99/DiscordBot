const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    
        globalName: {
    
            type: String,
            required: true
        },
        content: {
    
            type: String,
            required: true
        },
        date: {
    
            type: Date,
            default: Date.now
        },
        avatar: {
    
            type: String,
            required: true
        },
        userId: {

            type: String,
            required: true

        }
    });

module.exports = mongoose.model('Message', messageSchema);