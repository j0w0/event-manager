const Event = require('../../models/event');

module.exports = {
    index,
    create,
    show,
    update,
    delete: deleteOne
};

async function index(req, res) {
    try {
        const events = await Event.find({});
        if (!events) return res.status(401).json({err: 'No events'});
        res.status(200).json(events);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function create(req, res) {
    try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch(err) {
        res.status(400).json(err);
    }
}

async function show(req, res) {
    try {
        const event = await Event.findById(req.params.id);
        res.status(200).json(event);
    } catch(err) {
        res.status(400).json(err);
    }
}

async function update(req, res) {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedEvent);
    } catch(err) {
        res.status(400).json(err);
    }
}

async function deleteOne(req, res) {
    try {
        const deletedEvent = await Event.findByIdAndRemove(req.params.id);
        res.status(200).json(deletedEvent);
    } catch(err) {
        res.status(400).json(err);
    }
}