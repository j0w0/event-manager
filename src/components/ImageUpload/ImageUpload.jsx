import React, { useEffect, useState, useRef } from 'react';
import './ImageUpload.css';
import * as eventAPI from '../../services/events-api';

function ImageUpload(props) {

    // eslint-disable-next-line
    const [image, setImage] = useState(props.event.image);

    useEffect(() => {
        setImage(props.event.image);
    }, [props.event.image]);

    const fileInputRef = useRef();

    const handleImageUpload = async (e) => {
        // only run if image has been selected
        if(e.target.files.length > 0) {
            // upload image to aws s3
            const img = await eventAPI.uploadImage(e.target.files);
            props.event.image = img.path;
            props.setEvent({...props.event});

            // update db with new file image path
            const updatedEvent = await eventAPI.update(props.event)
            props.setEvent(updatedEvent);

            // reset file input
            fileInputRef.current.value = null;
        }
    }

    return (
        <div className="form-group">
            <input type="file" ref={fileInputRef} name="event-image" className="form-control-file" onChange={handleImageUpload} />
        </div>
    )
}

export default ImageUpload;