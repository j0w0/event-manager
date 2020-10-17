import React, { useRef, useEffect } from 'react';
import './EventEditForm.css';

function EventEditForm(props) {
    const autocompleteField = useRef();

    useEffect(() => {
        new window.google.maps.places.Autocomplete(
            autocompleteField.current,
            { types: ['geocode'] }
        );
    }, []);

    let sTime = props.event.startTime;
    let eTime = props.event.endTime;

    if(sTime) {
        const sTd = new Date(sTime);
        sTime = new Date(sTd.getTime() - sTd.getTimezoneOffset() * 60000).toISOString().slice(0,16);
    }

    if(eTime) {
        const eTd = new Date(eTime);
        eTime = new Date(eTd.getTime() - eTd.getTimezoneOffset() * 60000).toISOString().slice(0,16);
    }

    return (
        <form onSubmit={props.handleSubmit} autoComplete="off">

            <div className="form-group">
                <label htmlFor="name">Event Name</label>
                <input type="text" id="name" className="form-control"
                    name="name"
                    defaultValue={props.event.name}
                    onChange={props.handleInputChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea type="text" id="description" className="form-control"
                    name="description"
                    defaultValue={props.event.description}
                    onChange={props.handleInputChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="credits">Credits Required</label>
                <input type="text" id="credits" className="form-control"
                    name="credits"
                    defaultValue={props.event.credits}
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
                <label htmlFor="maxCapacity">Max Capacity</label>
                <input type="text" id="maxCapacity" className="form-control"
                    name="maxCapacity"
                    defaultValue={props.event.maxCapacity}
                    onChange={props.handleInputChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="venueName">Venue Name</label>
                <input type="text" id="venueName" className="form-control"
                    name="venueName"
                    defaultValue={props.event.venueName}
                    onChange={props.handleInputChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="googleAddress">Address</label>
                <input type="text" id="googleAddress" className="form-control"
                    name="googleAddress"
                    ref={autocompleteField}
                />
            </div>

            <button type="submit" className="btn btn-primary">Update</button>

        </form>
    );
}

export default EventEditForm;