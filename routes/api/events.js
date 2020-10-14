const express = require('express');
const router = express.Router();
const eventsCtrl = require('../../controllers/api/events');
const checkAuth = require('../../utils/checkAuth');

/*---------- Public Routes ----------*/
router.get('/', eventsCtrl.index); // all events
router.get('/:id', eventsCtrl.show); // single event

/*---------- Protected Routes ----------*/
router.post('/', eventsCtrl.create); // create event
router.put('/:id', checkAuth, eventsCtrl.update); // update event
router.delete('/:id', checkAuth, eventsCtrl.delete); // delete event

module.exports = router;