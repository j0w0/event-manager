const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    image: {
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
    lat: {
        type: Number
    },
    lng: {
        type: Number
    },
    maxCapacity: {
        type: Number
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);