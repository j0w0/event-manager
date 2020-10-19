import React, { useEffect, useState } from 'react';
import './EventEditPage.css';
import EventForm from '../../components/EventForm/EventForm';
import * as eventAPI from '../../services/events-api';
import * as googleAPI from '../../services/google-autocomplete';

function EventEditPage(props) {

    // set initial state
    const [event, setEvent] = useState({ event: props.event });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function fetchData() {
            // make call to back-end api to get event data
            const results = await eventAPI.getOne(props.match.params.id);

            if(props.user._id !== results.user || results.err) {
                // replace history if not owner or if error getting data
                props.history.replace('/');
            } else {
                // set state
                setEvent(results);
                setIsLoaded(true);
            }
        }
        fetchData();
    }, [ props ]);

    // update state based on input values
    const handleInputChange = (e) => setEvent({
        ...event,
        [e.currentTarget.name]: e.currentTarget.value
    });

    // handle google address autocomplete field
    const handleAutocomplete = async (place) => {
        const updatedState = googleAPI.parseAutocomplete(place);
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

            {isLoaded ? (
                <>
                    <h1>Edit {event.name} Event</h1>

                    <EventForm
                        {...props}
                        event={event}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        handleAutocomplete={handleAutocomplete}
                        onKeyDown={onKeyDown}
                    />
                </>
            ) : (
                <>Loading...</>
            )}

        </div>
    );
}

export default EventEditPage;