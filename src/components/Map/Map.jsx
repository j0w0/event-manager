import React, { useEffect, useRef } from 'react';
import './Map.css';
import { getCurrentLatLng } from '../../services/geolocation';

function Map(props) {
    const mapDiv = useRef(null);

    useEffect(() => {
        async function fetchData() {
            let location;

            if(props.lat && props.lng) {
                location = {lat: props.lat, lng: props.lng};
            } else {
                let {lat, lng} = await getCurrentLatLng();
                location = {lat, lng};
            }

            const map = new window.google.maps.Map(
                mapDiv.current, {
                    zoom: props.zoom || 14,
                    center: location,
                    disableDefaultUI: true,
                    // styles: mapStyle
                }
            );
            
            new window.google.maps.Marker({position: location, map: map});
        }
        fetchData();
    }, [props.lat, props.lng, props.zoom]);

    return (
        <div ref={mapDiv} className="Map mb-3">Loading...</div>
    )
}

export default Map;