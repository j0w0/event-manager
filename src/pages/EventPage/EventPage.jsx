import React from 'react';
import './EventPage.css';

function EventPage(props) {
    return (
        <div className='EventPage container py-3'>
            <h1>Event Details</h1>
            { props.location.state.event.name }
        </div>
    );
} 

export default EventPage;