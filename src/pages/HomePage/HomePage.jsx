import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = (props) => {

    let events;
    
    if (props.events.length !== 0) {
        events = props.events.map((event, idx) => {
            return (
                <article key={idx}>
                    <h4>{event.name}</h4>
                    <p>{event.description}</p>
                    <Link to={{
                        pathname: '/event',
                        state: { event: event }
                    }}>Read More</Link>
                </article>
            );
        });
    } else {
        events = <p>No events.</p>
    }

    return (
        <div className='HomePage container py-3'>

            <h1>Home</h1>
            { props.user && <p>This paragraph will show if you are logged in.</p> }

            <hr />

            <h2>Events</h2>
            { events }

        </div>
    );
};

export default HomePage;