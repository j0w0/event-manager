import React, { useEffect, useRef, useState } from 'react';
import './Map.css';
import { getCurrentLatLng } from '../../services/geolocation';

function Map(props) {

    const [ location, setLocation ] = useState({
        lat: props.lat,
        lng: props.lng
    });
    const mapDiv = useRef();

    useEffect(() => {
        async function fetchData() {
            if(props.lat && props.lng) {
                setLocation({
                    lat: props.lat,
                    lng: props.lng
                });
            } else {
                let {lat, lng} = await getCurrentLatLng();
                setLocation({lat, lng});
            }
        }
        fetchData();
    }, [props.lat, props.lng]);
    
    useEffect(() => {
        const map = new window.google.maps.Map(
            mapDiv.current, {
                zoom: props.zoom || 14,
                center: location,
                disableDefaultUI: true,
                // styles: mapStyle
            }
        );
        new window.google.maps.Marker({position: location, map: map});
    }, [props.zoom, location]);

    return (
        <div ref={mapDiv} className="Map mb-3">Loading...</div>
    )
}

export default Map;