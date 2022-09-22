import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyRestaurantThunk } from '../../store/restaurant';
import { getMyReservationsThunk } from '../../store/reservation';
import { NavLink, Redirect, useHistory, useParams } from "react-router-dom";
import GoogleMapAPI from '../Gmap/gmap'

export default function SearchPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    const { dateTime, covers, term } = useParams();
    console.log(dateTime)
    console.log(covers)
    console.log(term)


    return (
        <>
            <h2>now you are in search page</h2>
        </>
    )
}
