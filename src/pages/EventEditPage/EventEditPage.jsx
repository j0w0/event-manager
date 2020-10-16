import React, { useEffect, useState } from 'react';
import './EventEditPage.css';
import EventEditForm from '../../components/EventEditForm/EventEditForm';
import * as eventAPI from '../../services/events-api';

function EventEditPage(props) {

    const [event, setEvent] = useState({
        event: null
    });

    useEffect(() => {
        async function fetchData() {
            const results = await eventAPI.getOne(props.match.params.id);
            setEvent(results);
        }
        fetchData();
    }, [ props.match.params.id ]);

    if(event.err) {
        props.history.replace('/');
    }

    const handleInputChange = (e) => setEvent({
        ...event,
        [e.currentTarget.name]: e.currentTarget.value
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedEvent = await eventAPI.update(event);
        setEvent(updatedEvent);
        props.history.push(`/events/${event._id}`);
    }

    return (
        <div className='EventEditPage container py-3'>
            <h1>Edit {event.name} Event</h1>
            <EventEditForm {...props} event={event} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
        </div>
    );
}

export default EventEditPage;