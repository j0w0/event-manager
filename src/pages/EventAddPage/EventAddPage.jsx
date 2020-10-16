import React, { useState } from 'react';
import './EventAddPage.css';
import EventEditForm from '../../components/EventEditForm/EventEditForm';
import * as eventAPI from '../../services/events-api';

function EventAddPage(props) {

    const [event, setEvent] = useState({
        user: props.user._id
    });

    const handleInputChange = (e) => setEvent({
        ...event,
        [e.currentTarget.name]: e.currentTarget.value
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEvent = await eventAPI.create(event);
        setEvent(newEvent);
        props.history.push(`/`);
    }

    return (
        <div className='EventEditPage container py-3'>
            <h1>New Event</h1>
            <EventEditForm {...props} event={event} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
        </div>
    );
}

export default EventAddPage;