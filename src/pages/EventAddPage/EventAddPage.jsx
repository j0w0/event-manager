import React, { useState } from 'react';
import './EventAddPage.css';
import EventForm from '../../components/EventForm/EventForm';
import * as eventAPI from '../../services/events-api';

function EventAddPage(props) {

    const [event, setEvent] = useState({
        user: props.user._id
    });

    const handleInputChange = (e) => setEvent({
        ...event,
        [e.currentTarget.name]: e.currentTarget.value
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEvent = await eventAPI.create(event);
        setEvent(newEvent);
        props.history.push(`/`);
    }

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

    const onKeyDown = (keyEvent) => {
        if (keyEvent.keyCode === 13 || keyEvent.key === 'Enter') {
            keyEvent.preventDefault();
        }
    }

    return (
        <div className='EventEditPage container py-3'>
            <h1>New Event</h1>
            <EventForm
                {...props}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                handleAutocomplete={handleAutocomplete}
                onKeyDown={onKeyDown}
            />
        </div>
    );
}

export default EventAddPage;