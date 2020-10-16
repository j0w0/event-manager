import React from 'react';
import './EventEditForm.css';

function EventEditForm(props) {
    return (
        <form onSubmit={props.handleSubmit}>

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






            

            <button type="submit" className="btn btn-primary">Update</button>

        </form>
    );
}

export default EventEditForm;