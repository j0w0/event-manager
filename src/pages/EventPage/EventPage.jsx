import React, { useEffect, useState } from 'react';
import './EventPage.css';
import * as eventAPI from '../../services/events-api';
import { Link } from 'react-router-dom';
import Map from '../../components/Map/Map';

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

            <h1>{event.name}</h1>

            <p>
                Start: {event.startTime}<br />
                End: {event.endTime}
            </p>

            <p>{event.description}</p>

            <address>
                {event.venueName}<br />
                {event.address}<br />
                {event.city}, {event.state} {event.zip}
            </address>

            {props.user && event.user !== props.user._id && (
                <button type="button" className="btn btn-primary mb-3">Reserve Ticket</button>
            )}

            {props.user && event.user === props.user._id && (
                <p><Link to={{ pathname: `/events/${event._id}/edit` }}>Edit</Link></p>
            )}

            <Map lat={event.lat} lng={event.lng} />
            
        </div>
    );
} 

export default EventPage;