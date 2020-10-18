import React, { useEffect, useState } from 'react';
import './EventEditPage.css';
import EventForm from '../../components/EventForm/EventForm';
import * as eventAPI from '../../services/events-api';
import * as googleAPI from '../../services/google-autocomplete';

function EventEditPage(props) {

    // set initial state
    const [event, setEvent] = useState({
        event: props.event
    });

    useEffect(() => {
        // make call to back-end api to get event data
        async function fetchData() {
            const results = await eventAPI.getOne(props.match.params.id);
            setEvent(results);

            // replace page if user does not 'own' this even / cannot edit
            props.user._id !== results.user && props.history.replace('/');
        }
        fetchData();
    }, [ props.match.params.id, props.history, props.user._id ]);

    // replace page if error retrieving event data
    if(event.err) props.history.replace('/');

    // update state based on input values
    const handleInputChange = (e) => setEvent({
        ...event,
        [e.currentTarget.name]: e.currentTarget.value
    });

    // handle google address autocomplete field
    const handleAutocomplete = async (place) => {
        const updatedState = await googleAPI.parseAutocomplete(place);
        setEvent({ ...event, ...updatedState });
    }

    // prevent form submission when selecting address with 'enter' key
    const onKeyDown = (keyEvent) => googleAPI.keyDown(keyEvent);

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // make call to back-end api / update event
        const updatedEvent = await eventAPI.update(event);
        setEvent(updatedEvent);

        // go to event page to see updated info
        props.history.push(`/events/${event._id}`);
    }

    return (
        <div className='EventEditPage container py-3'>
            <h1>Edit {event.name} Event</h1>
            <EventForm
                {...props}
                event={event}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                handleAutocomplete={handleAutocomplete}
                onKeyDown={onKeyDown}
            />
        </div>
    );
}

export default EventEditPage;