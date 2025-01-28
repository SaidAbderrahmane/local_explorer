const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        savedActivities: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    });

module.exports = User = mongoose.model('User', UserSchema);
