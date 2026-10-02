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
        async function initMap() {
            const { Map } = await window.google.maps.importLibrary('maps');
            const { Marker } = await window.google.maps.importLibrary('marker');
            if(!mapDiv.current) return;
            const map = new Map(
                mapDiv.current, {
                    zoom: props.zoom || 14,
                    center: location,
                    disableDefaultUI: true,
                    // styles: mapStyle
                }
            );
            new Marker({position: location, map: map});
        }
        initMap();
    }, [props.zoom, location]);

    return (
        <div ref={mapDiv} className="Map mb-3">Loading...</div>
    )
}

export default Map;