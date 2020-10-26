import React, { useRef, useEffect, useState } from 'react';
import './EventForm.css';
import Map from '../../components/Map/Map';
import * as googleAPI from '../../services/google-autocomplete';

function EventForm(props) {
    const autocompleteField = useRef();
    const [fullAddress, setFullAddress] = useState({});

    let fullAddressStr, sTime, eTime;

    if(props.event) {
        if(props.event.address && props.event.city && props.event.state) {
            fullAddressStr = `${props.event.address}, ${props.event.city}, ${props.event.state}`;
        }

        sTime = props.event.startTime;
        eTime = props.event.endTime;

        if(sTime) {
            const sTd = new Date(sTime);
            sTime = new Date(sTd.getTime() - sTd.getTimezoneOffset() * 60000).toISOString().slice(0,16);
        }

        if(eTime) {
            const eTd = new Date(eTime);
            eTime = new Date(eTd.getTime() - eTd.getTimezoneOffset() * 60000).toISOString().slice(0,16);
        }
    }

    useEffect(() => {
        props.handleAutocomplete(fullAddress);
        // eslint-disable-next-line
    }, [ fullAddress ]);

    useEffect(() => {
        const autocomplete = new window.google.maps.places.Autocomplete(
            autocompleteField.current,
            { types: ['geocode'] }
        );

        autocomplete.setFields(["address_component", "geometry"]);

        new window.google.maps.event.addListener(autocomplete, 'place_changed', function() {
            const place = autocomplete.getPlace();
            const updatedState = googleAPI.parseAutocomplete(place);
            setFullAddress(updatedState);
        });
    }, []);
    
    return (
        <form className="EventForm" onSubmit={props.handleSubmit} onKeyDown={props.onKeyDown} autoComplete="off">

            <div className="row">
                <div className="col-md-6 col-lg-8">
                    <div className="form-group">
                        <label htmlFor="name">Event Name</label>
                        <input type="text" id="name" className="form-control"
                            name="name"
                            defaultValue={props.event && props.event.name}
                            onChange={props.handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="startTime">Start Time</label>
                        <input type="datetime-local" id="startTime" className="form-control"
                            name="startTime"
                            defaultValue={sTime}
                            onChange={props.handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="endTime">End Time</label>
                        <input type="datetime-local" id="endTime" className="form-control"
                            name="endTime"
                            defaultValue={eTime}
                            onChange={props.handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea type="text" id="description" className="form-control"
                            name="description"
                            defaultValue={props.event && props.event.description}
                            onChange={props.handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="maxCapacity">Max Capacity</label>
                        <input type="text" id="maxCapacity" className="form-control"
                            name="maxCapacity"
                            defaultValue={props.event && props.event.maxCapacity}
                            onChange={props.handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="venueName">Venue Name</label>
                        <input type="text" id="venueName" className="form-control"
                            name="venueName"
                            defaultValue={props.event && props.event.venueName}
                            onChange={props.handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="col-md-6 col-lg-4">
                    <div className="form-group">
                        <label htmlFor="googleAddress">Address</label>
                        <input type="text" id="googleAddress" className="form-control"
                            name="googleAddress"
                            defaultValue={fullAddressStr}
                            ref={autocompleteField}
                            onKeyDown={props.onKeyDown}
                            required
                        />
                    </div>

                    <Map lat={props.event && props.event.lat} lng={props.event && props.event.lng} />
                </div>
            </div>

            <button type="submit" className="btn btn-primary">{ props.isNew ? 'Create' : 'Update' }</button>
            
        </form>
    );
}

export default EventForm;