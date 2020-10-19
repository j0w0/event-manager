import React, { useEffect, useState } from 'react';
import './EventPage.css';
import { Link } from 'react-router-dom';
import Map from '../../components/Map/Map';
import * as eventAPI from '../../services/events-api';

function EventPage(props) {

    // set initial state
    const [event, setEvent] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function fetchData() {
            // make call to back-end api to get event data
            const results = await eventAPI.getOne(props.match.params.id);
            
            if(results.err) {
                // replace page if error retrieving event data
                props.history.replace('/');
            } else {
                // set state
                setEvent(results);
                setIsLoaded(true);
            }
        }
        fetchData();
    }, [ props.match.params.id, props.history ]);

    const handleRSVP = async (e) => {
        // add this user to the attendees array
        event.attendees.push(props.user);

        // make call to back-end api / update event
        const updatedEvent = await eventAPI.update(event);
        setEvent(updatedEvent);

        // go to event page to see updated info
        props.history.push(`/events/${event._id}`);
    }

    return (

        <div className='EventPage container py-3'>

            {isLoaded ? (
                <>
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

                    {props.user ? (

                        event.user === props.user._id ? (
                            <p><Link to={{ pathname: `/events/${event._id}/edit` }}>Edit</Link></p>
                        ) : (
                            <>
                                {event.attendees.includes(props.user._id) ? (
                                    <p className="font-weight-bold text-success">Awesome! You have a ticket to this event!</p>
                                ) : (
                                    event.maxCapacity - event.attendees.length < 50 && (
                                        <p className="font-weight-bold text-danger">Hurry! Only {event.maxCapacity - event.attendees.length} tickets left!</p>
                                    )
                                )}

                                <button
                                    type="button"
                                    className="btn btn-primary mb-3"
                                    onClick={ handleRSVP }
                                    disabled={ event.attendees.includes(props.user._id) }
                                >
                                    { event.attendees.includes(props.user._id) ? `Ticket Reserved` : `Reserve Ticket` }
                                </button>
                            </>
                        )

                    ) : (
                        <Link to="/login" className="btn btn-primary mb-3">Log in to reserve your ticket</Link>
                    )}

                    <Map lat={event.lat} lng={event.lng} />
                </>
            ) : (
                <>Loading...</>
            )}
            
        </div>
    );
} 

export default EventPage;