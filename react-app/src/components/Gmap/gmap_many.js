import React, { useMemo, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '300px',
    height: '850px'
};

function GoogleMapAPIMany({ searchRes }) {

    let center;
    const formattedAddress = 'CA, 94401, USA';
    // require("dotenv").config();

    var allAddresses = [];

    searchRes.forEach(each => {
        let eachAddress = each.address + ', ' + each.city + ', ' + each.state + ', ' + each.zip_code + ', USA';
        allAddresses.push(eachAddress)
    })

    var geocoder = new window.google.maps.Geocoder();

    let count;
    let geoCodeAddressees = [];
    // for (count = 0; count < allAddresses.length; count++) {
    //     geocoder.geocode({ 'address': allAddresses[count] }, function (results, status) {
    //         if (status === 'OK') {
    //             // var marker = new window.google.maps.Marker({
    //             //     map: map,
    //             //     position: results[0].geometry.location
    //             // });
    //             geoCodeAddressees.push(results[0].geometry.location)
    //         }
    //     })
    // }

    geoCodeAddressees.forEach(each => {
        var marker = new window.google.maps.Marker({
            map: map,
            position: each
        });
    })



    var geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ 'address': formattedAddress }, function (results, status) {
        if (status === 'OK') {
            map?.setCenter(results[0].geometry.location);
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
        map.setZoom(10);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        (<GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={11}
            zoomControl={true}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <Marker ></Marker>
            {/* <Marker position={center}></Marker> */}
        </GoogleMap>)

    ) : <></>
}

export default React.memo(GoogleMapAPIMany)
// export default GoogleMapAPI
