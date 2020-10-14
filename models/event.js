const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    credits: {
        type: Number
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    venueName: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip: {
        type: String
    },
    maxCapacity: {
        type: Number
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);