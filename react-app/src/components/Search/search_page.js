import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchRestaurantThunk } from '../../store/search';
import { NavLink, Redirect, useHistory, useParams } from "react-router-dom";
import defaultImg3 from '../../icons/defaultImg3.png'
import './search_page.css'

export default function SearchPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [showHomeReserve, setShowHomeReserve] = useState(false);
    const [resId, setRestId] = useState();
    const [resTime, setResTime] = useState();
    const searchRes = useSelector(state => state.search)

    const dollarSigns = ['', '$', '$$', '$$$', '$$$$'];

    useEffect(() => {
        dispatch(searchRestaurantThunk()).then(() => setLoaded(true))
    }, [dispatch])

    const { dateTime, covers, term } = useParams();
    // console.log(dateTime)
    // console.log(covers)
    // console.log(term)

    const handleHomeReserve = async (e, id) => {
        e.preventDefault();
        setRestId(id)
        setResTime(e.target.value)
        setShowHomeReserve(true)
    }

    let d = new Date()
    // d = new Date(d.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }))
    const todayMonth = d.getMonth() + 1
    const todayString = [d.getFullYear(), ('0' + todayMonth).slice(-2), ('0' + d.getDate()).slice(-2)].join('-')
    const nowHour = d.getHours();
    const getHours = each => {
        return Number(each['close_time'].slice(0, 2));
    }


    return loaded && (
        <div>
            <div className='search-all-container'>
                <div className='search-left'>
                    column for map & filters
                </div>
                <div className='search-right'>
                    <div className='search-right-sort'>
                        Sort v
                    </div>
                    <div className='search-right-res'>
                        {searchRes?.map(restaurant => {
                            return <div className='search-res-each' key={restaurant.id}>
                                <NavLink className='search-res-nav-whole' to={`/restaurants/${restaurant.id}`}>
                                    <div className='search-res-cover'>
                                        <img src={restaurant.cover} alt='restaurant img' height={'200px'}
                                            onError={(e) => {
                                                if (e.target.src !== defaultImg3) { e.target.onerror = null; e.target.src = defaultImg3; }
                                            }} />
                                    </div>
                                    <div className='search-res-details'>
                                        <div className='search-res-nav-div'>
                                            <NavLink className='search-res-nav' to={`/restaurants/${restaurant.id}`}>{restaurant.name}</NavLink>
                                        </div>
                                        <div className='search-res-dcl'>{dollarSigns[restaurant.price_range]} · {restaurant.cuisine} · {restaurant.city}</div>
                                        <div className='search-res-timeslots'>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={getHours(restaurant) - 3} disabled={getHours(restaurant) - 3 <= nowHour}>{getHours(restaurant) - 3}:00</button>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={getHours(restaurant) - 2} disabled={getHours(restaurant) - 2 <= nowHour}>{getHours(restaurant) - 2}:00</button>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={getHours(restaurant) - 1} disabled={getHours(restaurant) - 1 <= nowHour}>{getHours(restaurant) - 1}:00</button>
                                        </div>
                                    </div>
                                </NavLink>

                                {/* {restaurant => slotGenerator(restaurant).map(each => {
                            <div>{each}</div>
                        })} */}
                            </div >
                        })
                        }
                    </div>
                </div>
            </div >
        </div>
    )
}
