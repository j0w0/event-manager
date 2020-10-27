import React from 'react';
import './EventCard.css';
import { Link } from 'react-router-dom';
import * as dateUtils from '../../utils/date-utils';

function EventCard(props) {
    return (
        <div className="card mb-3" key={props.idx}>
            
            <img src={props.event.image ? props.event.image : 'https://i.imgur.com/qHdfdgh.jpg'} alt={props.event.name} className="card-img-top" />

            <div className="card-body">
                <h5 className="card-title">{props.event.name}</h5>

                <p>{dateUtils.eventDate(props.event.startTime, props.event.endTime)}</p>

                <address>
                    <strong>{props.event.venueName}</strong><br />
                    {props.event.address}<br />
                    {props.event.city}, {props.event.state} {props.event.zip}
                </address>
                
                <Link to={{ pathname: `/events/${props.event._id}` }}>Read More &raquo;</Link>
            </div>

        </div>
    )
}

export default EventCard;