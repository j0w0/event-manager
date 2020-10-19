import React, { useEffect, useState } from 'react';
import './EventsPage.css';
import { Link } from 'react-router-dom';
import * as eventAPI from '../../services/events-api';

function EventsPage(props) {

    // set initial state
    const [events, setEvents] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function fetchData() {
            // get all events from back-end api
            const results = await eventAPI.getAll();

            if(results.err) {
                // replace page if error retrieving event data
                results.err && props.history.replace('/');
            } else {
                // set state
                setEvents(results);
                setIsLoaded(true);
            }
        }
        fetchData();
    }, [ props.history ]);

    return (
        <div className='EventsPage container py-3'>

            {isLoaded ? (
                <>
                    <h1>EVNTZ</h1>

                    { props.user && <Link to='events/new'>New Event</Link> }

                    <hr />

                    <h2>Events</h2>

                    {events.map((event, idx) => {
                        return (
                            <article key={idx}>
                                <h4>{event.name}</h4>
                                <p>{event.description}</p>
                                <Link to={{ pathname: `/events/${event._id}` }}>Read More</Link>
                            </article>
                        );
                    })}
                </>
            ) : (
                <>Loading...</>
            )}

        </div>
    );
} 

export default EventsPage;