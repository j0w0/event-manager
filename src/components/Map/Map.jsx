import React, { useEffect } from 'react';
import './Map.css';
import { getCurrentLatLng } from '../../services/geolocation';

function Map(props) {
    const mapDiv = React.createRef();

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
    }, [ mapDiv, props ]);

    return (
        <div ref={mapDiv} className="Map mb-3"></div>
    )
}

export default Map;