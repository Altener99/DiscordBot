const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    globalname: {

        type: String,
        required: true
    },
    username: {

        type: String,
        required: true
    },
    avatar: {

        type: String,
        required: true
    },
    userId: {

        type: String,
        required: true

    }
})

module.exports = mongoose.model('User', userSchema);

