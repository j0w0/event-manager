import React, { useEffect, useState } from 'react';
import './MyEventsPage.css';
import { Link } from 'react-router-dom';
import * as eventAPI from '../../services/events-api';

function MyEventsPage(props) {

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

                // filter out events that user has not rsvp'd to
                const res = results.filter(event => {
                    let rsvp = false;

                    event.attendees.find(att => {
                        return rsvp = att._id === props.user._id && true;
                    });

                    return rsvp;
                });

                // set state
                setEvents(res);
                setIsLoaded(true);
            }
        }
        fetchData();
    }, [ props.history, props.user._id ]);

    return (
        <div className='MyEventsPage container py-3'>

            {isLoaded ? (
                <>
                    <h1>My Events</h1>

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

export default MyEventsPage;