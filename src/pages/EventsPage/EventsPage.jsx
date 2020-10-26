import React, { useEffect, useState } from 'react';
import './EventsPage.css';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import EventCard from '../../components/EventCard/EventCard';
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
        <div className='EventsPage'>

            <PageHeader />

            <div className='container py-3'>
                {isLoaded ? (
                    <>
                        <h1 className="event-name">
                            <span>EVNTZ</span>
                        </h1>

                        { props.user && <p><Link to='events/new'>New Event</Link></p> }

                        <div className="row">
                            {events.map((event, idx) => {
                                return (
                                    <div className="col-md-6 col-lg-4">
                                        <EventCard event={event} idx={idx} />
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>

        </div>
    );
} 

export default EventsPage;