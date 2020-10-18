import React, { useEffect } from 'react';
import './Map.css';

function Map(props) {
    const mapDiv = React.createRef();

    useEffect(() => {
        if(props.lat && props.lng) {
            const location = {lat: props.lat, lng: props.lng};
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
    }, [ mapDiv, props.lat, props.lng, props.zoom ]);

    return (
        <div ref={mapDiv} className="Map"></div>
    )
}

export default Map;