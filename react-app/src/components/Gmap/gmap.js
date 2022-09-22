import React, { useMemo, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '600px',
    height: '250px'
};

function GoogleMapAPI({ therestaurant }) {

    let center;
    const [latlngLoaded, setLatlngLoaded] = useState(true);
    // console.log('emm hello key??----------', apikey)
    // require("dotenv").config();

    const formattedAddress = therestaurant.address + ', ' + therestaurant.city + ', ' + therestaurant.state + ', ' + therestaurant.zip_code + ', USA';

    // const address = '3001 El Camino Real, Redwood City, CA, 94061, USA';
    console.log('what is formatted address', formattedAddress)

    var geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ 'address': formattedAddress }, function (results, status) {
        if (status === 'OK') {
            // center = results[0].geometry.location;
            // let avglat = ((results[0].geometry.viewport.Ab.lo + results[0].geometry.viewport.Ab.hi) / 2).toFixed(6);
            // let avglng = ((results[0].geometry.viewport.Va.lo + results[0].geometry.viewport.Va.hi) / 2).toFixed(6);
            // center = {
                //     lat: avglat,
                //     lng: avglng,
            // }
            map?.setCenter(results[0].geometry.location);

            var marker = new window.google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    })


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

    return latlngLoaded && isLoaded ? (
        (<GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={18}
            zoomControl={true}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <Marker position={center}></Marker>
        </GoogleMap>)

    ) : <></>
}

export default React.memo(GoogleMapAPI)
// export default GoogleMapAPI
