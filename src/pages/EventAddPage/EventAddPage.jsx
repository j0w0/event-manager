import React, { useState } from 'react';
import './EventAddPage.css';
import EventForm from '../../components/EventForm/EventForm';
import PageHeader from '../../components/PageHeader/PageHeader';
import * as eventAPI from '../../services/events-api';
import * as googleAPI from '../../services/google-autocomplete';

function EventAddPage(props) {

    // set initial state
    const [event, setEvent] = useState({
        user: props.user._id,
    });

    // update state based on input values
    const handleInputChange = (e) => setEvent({
        ...event,
        [e.currentTarget.name]: e.currentTarget.value
    });

    // handle google address autocomplete field
    const handleAutocomplete = (updatedState) => setEvent({
        ...event,
        ...updatedState
    });

    // prevent form submission when selecting address with 'enter' key
    const onKeyDown = (keyEvent) => googleAPI.keyDown(keyEvent);

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // make call to back-end api / create event
        const newEvent = await eventAPI.create(event);
        setEvent(newEvent);

        // go to root to see events
        props.history.push(`/`);
    }

    return (
        <div className='EventEditPage'>

            <PageHeader />

            <div className='container py-3'>

                <h1 className="event-name">
                    <span>New Event</span>
                </h1>

                <EventForm
                    {...props}
                    event={event}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    handleAutocomplete={handleAutocomplete}
                    onKeyDown={onKeyDown}
                    isNew={true}
                />

            </div>

        </div>
    );
}

export default EventAddPage;