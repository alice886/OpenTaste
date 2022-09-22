import React, { useMemo } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '600px',
    height: '300px'
};


function GoogleMapAPI() {
    // require("dotenv").config();
    const address = '3001 El Camino Real, Redwood City, CA, 94061, USA';
    var geocoder= new window.google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == 'OK') {
            // map.setCenter(results[0].geometry.location);
            // var marker = new google.maps.Marker({
            //     map: map,
            //     position: results[0].geometry.location
            // });
            console.log('what is the geocoded lat lng ---', results[0].geometry.location)
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });


    const center = useMemo(() => ({
        lat: 37.46858,
        lng: -122.210374
    }), []);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyCYbe3jm8d31jqk-4buxC0wSuQwO6-eBH4'
        // googleMapsApiKey: process.env.GOOGLE_MAP_KEY
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        // map.fitBounds(bounds);
        map.setZoom(18);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    // console.log('emm hello key??----------', apikey)

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={18}
            zoomControl={true}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <Marker position={center}></Marker>
        </GoogleMap>

    ) : <></>
}

export default React.memo(GoogleMapAPI)
