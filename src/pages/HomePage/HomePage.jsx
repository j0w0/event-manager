import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import * as eventAPI from '../../services/events-api';

function HomePage(props) {

    const [events, setEvents] = useState({
        events: null
    });

    useEffect(() => {
        async function fetchData() {
            const events = await eventAPI.getAll();
            setEvents(events);
        }
        fetchData();
    }, []);

    let eventsList;
    
    if (events.length !== 0) {
        eventsList = Array.from(events).map((event, idx) => {
            return (
                <article key={idx}>
                    <h4>{event.name}</h4>
                    <p>{event.description}</p>
                    <Link to={{ pathname: `/event/${event._id}` }}>Read More</Link>
                </article>
            );
        });
    } else {
        eventsList = <p>No events.</p>
    }

    return (
        <div className='HomePage container py-3'>

            <h1>Home</h1>
            { props.user && <p>This paragraph will show if you are logged in.</p> }

            <hr />

            <h2>Events</h2>
            { eventsList }

        </div>
    );
};

export default HomePage;