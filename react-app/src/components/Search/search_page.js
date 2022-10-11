import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchRestaurantThunk } from '../../store/search';
import { NavLink, Redirect, useHistory, useParams } from "react-router-dom";
import defaultImg3 from '../../icons/defaultImg3.png'
import loadingpic from '../../icons/Logo.jpg'
import './search_page.css'

export default function SearchPage() {
    const history = useHistory();
    const location = window.location.search
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [showHomeReserve, setShowHomeReserve] = useState(false);
    const [resId, setRestId] = useState();
    const [resTime, setResTime] = useState();
    const [sortLabel, setSortLabel] = useState('Sort by');
    const searchRes = useSelector(state => state.search)
    const searchResLength = useSelector(state => state.errors)

    console.log(searchResLength, 'hahahahaha')

    const dollarSigns = ['', '$', '$$', '$$$', '$$$$'];

    useEffect(() => {
        dispatch(searchRestaurantThunk(location)).then(() => setLoaded(true))
    }, [dispatch, history])

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

    const handleSort = async e => {
        e.preventDefault();
        let oldurl = location.split('&').slice(0, 3)
        let newsort = '&sort=' + e.target.value + '&page=1'
        let newlocation = oldurl.join('&') + newsort
        setLoaded(false)
        console.log('what is the location split', oldurl.join('&') + newsort)
        dispatch(searchRestaurantThunk(newlocation)).then(() => {
            if (e.target.value === 'newest') {
                setSortLabel('Newest')
            } else if (e.target.value === 'priceasc') {
                setSortLabel('Price Range: Ascending - $')
            } else {
                setSortLabel('Price Range: Decending - $$$$$')
            }
            setLoaded(true)
            history.push(`/search${newlocation}`)
        })

    }

    if (!loaded) {
        return <div className='loading-img'>
            <img src={loadingpic}></img>
        </div>
    }


    return loaded && (
        <div>
            <div className='search-all-container'>
                <div className='search-left'>
                    column for map & filters
                </div>
                <div className='search-right'>
                    <div className='search-right-sort'>

                        <select onChange={handleSort}>
                            <option value={'default'} disabled selected>{sortLabel}</option>
                            <option value={'newest'} >Newest</option>
                            <option value={'priceasc'} >Price Range: Ascending - $</option>
                            <option value={'pricedes'} >Price Range: Decending - $$$$$</option>
                            {/* <option value={'highrate'}>Highest Rated</option> */}
                        </select>
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
