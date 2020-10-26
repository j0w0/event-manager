import React from 'react';
import './ImageUpload.css';

function ImageUpload(props) {


    return (
        <div className="form-group">
            <label htmlFor="event-image">Event Image</label>
            <input type="file" name="event-image" className="form-control-file" onChange={props.handleImageUpload} />
        </div>
    )
}

export default ImageUpload;