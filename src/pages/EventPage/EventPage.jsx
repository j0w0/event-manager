import React from 'react';
import { useEffect, useState } from 'react';
import './EventPage.css';
import * as eventAPI from '../../services/events-api';
import { Redirect } from 'react-router-dom';

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
        return <Redirect to='/' />
    }

    return (
        <div className='EventPage container py-3'>
            <h1>Event Details</h1>
            {event.name}
        </div>
    );
} 

export default EventPage;