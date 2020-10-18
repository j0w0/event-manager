import React, { useEffect, useState } from 'react';
import './EventEditPage.css';
import EventForm from '../../components/EventForm/EventForm';
import * as eventAPI from '../../services/events-api';

function EventEditPage(props) {

    const [event, setEvent] = useState({
        event: props.event
    });

    useEffect(() => {
        async function fetchData() {
            const results = await eventAPI.getOne(props.match.params.id);
            setEvent(results);

            props.user._id !== results.user && props.history.replace('/');
        }
        fetchData();
    }, [ props.match.params.id, props.history, props.user._id ]);

    if(event.err) {
        props.history.replace('/');
    }

    const handleInputChange = (e) => setEvent({
        ...event,
        [e.currentTarget.name]: e.currentTarget.value
    });

    const handleAutocomplete = (place) => {
        const componentForm = {
            street_number: "short_name",
            route: "long_name",
            locality: "long_name",
            administrative_area_level_1: "short_name",
            postal_code: "short_name",
        };

        const addressInputs = [];

        // get values from google return
        for(const component of place.address_components) {
            const addressType = component.types[0];

            if(componentForm[addressType]) {
                const val = component[componentForm[addressType]];
                addressInputs[addressType] = val;
            }
        }

        const updatedState = [];

        // put values into state-specific properties

        if(addressInputs['street_number'] && addressInputs['route']) {
            updatedState['address'] = `${addressInputs['street_number']} ${addressInputs['route']}`;
        }

        if(addressInputs['locality']) {
            updatedState['city'] = addressInputs['locality'];
        }

        if(addressInputs['administrative_area_level_1']) {
            updatedState['state'] = addressInputs['administrative_area_level_1'];
        }

        if(addressInputs['postal_code']) {
            updatedState['zip'] = addressInputs['postal_code'];
        }

        setEvent({
            ...event,
            ...updatedState
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedEvent = await eventAPI.update(event);
        setEvent(updatedEvent);
        props.history.push(`/events/${event._id}`);
    }

    const onKeyDown = (keyEvent) => {
        if (keyEvent.keyCode === 13 || keyEvent.key === 'Enter') {
            keyEvent.preventDefault();
        }
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