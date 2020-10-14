import React from 'react';
import './EventPage.css';

function EventPage(props) {
    const event = props.location.state.event;
    return (
        <div className='EventPage container py-3'>
            <h1>Event Details</h1>
            { event.name }<br />
            { event.description }<br />
        </div>
    );
} 

export default EventPage;