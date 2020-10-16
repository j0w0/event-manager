import React, { useEffect, useState } from 'react';
import './EventPage.css';
import * as eventAPI from '../../services/events-api';
import { Link } from 'react-router-dom';

function EventPage(props) {

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

    return (
        <div className='EventPage container py-3'>

            <h1>Event Details</h1>

            {event.name}

            {event.user === props.user._id && (
                <p><Link to={{ pathname: `/events/${event._id}/edit` }}>Edit</Link></p>
            )}
            
        </div>
    );
} 

export default EventPage;