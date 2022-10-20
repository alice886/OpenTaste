import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchRestaurantThunk } from '../../store/search';
import { Modal } from '../context/Modal';
import SearchReservationModal from '../Reservations/Reservation_Create_Modal_at_Search';
import { NavLink, Redirect, useHistory, useParams } from "react-router-dom";
import GoogleMapAPIMany from '../Gmap/gmap_many'
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
    const [resHour, setResHour] = useState();
    const [filterPrice, setFilterPrice] = useState();
    const [filterCity, setFilterCity] = useState();
    const [filterCuisine, setFilterCuisine] = useState();
    const [sortLabel, setSortLabel] = useState('Sort by');
    const searchRes = useSelector(state => state.search)
    const searchResLength = useSelector(state => state.errors)
    const [noResUnderF, setNoResUnderF] = useState(false)
    const [fClicked, setFClick] = useState(false)

    const dollarSigns = ['', '$', '$$', '$$$', '$$$$'];

    useEffect(() => {
        dispatch(searchRestaurantThunk(location)).then(() => { setLoaded(true) })
    }, [dispatch, history])

    let searchD = window.location.search.split('&')[0].split('=')[1].split('T')[0]
    let searchDyear = searchD.split('-')[0]
    let searchDmonth = searchD.split('-')[1]
    let searchDday = searchD.split('-')[2]
    let searchT = window.location.search.split('&')[0].split('=')[1].split('T')[1].split('%3A')
    let searchPt = Number(window.location.search.split('&')[1].split('=')[1])

    let collectSearchFilters = document.getElementsByClassName('search-res-nav-whole')

    useEffect(() => {
        if (collectSearchFilters?.length === 0) {
            setNoResUnderF(true)
        }
        if (collectSearchFilters?.length > 0) {
            setNoResUnderF(false)
        }
    }, [filterPrice, filterCuisine, filterCity])


    const handleHomeReserve = async (e, id) => {
        e.preventDefault();
        let slotHour = Number((e.target.value).split(':')[0]);
        setRestId(id)
        setResTime(e.target.value)
        setShowHomeReserve(true)
    }

    const neiborhood_count = ['San Francisco', 'Burlingame', 'Palo Alto', 'San Mateo']

    const cuisine_count = ['American', 'Italian', 'Steakhouse', 'Seafood', 'French', 'Indian', 'Mexican',
        'Japanese', 'Chinese', 'Spanish', 'Greek', 'Asian', 'Continental', 'Filipino', 'Café', 'Wine',
        'Winery', 'Irish', 'Fushion/Eclectic', 'Tapas/Small Plates', 'Turkish', 'Persian', 'Burmese', 'Other'];

    let d = new Date()
    // d = new Date(d.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }))
    const nowYear = d.getFullYear()
    const todayMonth = d.getMonth() + 1
    const todayString = [d.getFullYear(), ('0' + todayMonth).slice(-2), ('0' + d.getDate()).slice(-2)].join('-')
    const nowDate = d.getDate();
    const nowHour = d.getHours();
    const nowMin = d.getMinutes();
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
            } else if (e.target.value === 'default') {
                setSortLabel('Default')
            } else if (e.target.value === 'priceasc') {
                setSortLabel('Price Range: Ascending - $')
            } else {
                setSortLabel('Price Range: Decending - $$$$$')
            }
            setLoaded(true)
            history.push(`/search${newlocation}`)
        })

    }

    // let cuisineList = document.getElementById('cuisineList')


    // const handleClearFilter = async e => {
    //     e.preventDefault();
    //     let radios = document.getElementsByName('priceradio')
    //     setFilterPrice();
    //     radios.checked = false
    // }

    let checkboxes = document.querySelectorAll('.checkbox')
    let filterCuisineArray = [];

    if (checkboxes) {
        for (let checkbox of checkboxes) {
            if (checkbox.checked == true) {
                filterCuisineArray.push(checkbox.value)
            } else {
                filterCuisineArray = filterCuisineArray.filter(e => e !== checkbox.value);
            }
        }
    }

    const validateSearchDate = async (e) => {
        let daySearch = new Date(searchD)
        let dayNowNew = new Date(nowYear + '-' + todayMonth + '-' + nowDate)
        let slotHour = (e.target.value).split(':')[0];
        if (daySearch - dayNowNew > 0) {
            return false;
        } else if (daySearch - dayNowNew == 0) {
            if (slotHour - nowHour > 0) {
                return false;
            }
            return true;
        }
        return true;
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
                    <div>
                        {/* <button onClick={handleClearFilter}>Clear Filter</button>
                        <button onClick={handleApplyFilter}>Apply</button> */}
                    </div>
                    <div className='price-sort'>
                        <fieldset >
                            <label>💰 Price Range</label>
                            <div>
                                <input type="radio" name='priceradio' id='priceradios' onClick={() => setFilterPrice()}>
                                </input>
                                <label>All Price Range</label>
                            </div>
                            <div>
                                <input type="radio" name='priceradio' id='priceradios' onClick={() => { setFilterPrice(1); setFClick(true) }}></input>
                                <label>$ - $30 and under</label>
                            </div>
                            <div>
                                <input type="radio" name='priceradio' id='priceradios' onClick={() => { setFilterPrice(2); setFClick(true) }} ></input>
                                <label>$$ - $31 to $50</label>
                            </div>
                            <div>
                                <input type="radio" name='priceradio' id='priceradios' onClick={() => { setFilterPrice(3); setFClick(true) }}></input>
                                <label>$$$ - $51 to $100</label>
                            </div>
                            <div>
                                <input type="radio" name='priceradio' id='priceradios' onClick={() => { setFilterPrice(4); setFClick(true) }}></input>
                                <label>$$$$ - $101 and over</label>
                            </div>
                        </fieldset>
                    </div>
                    <div className='neighborhood-sort'>
                        <fieldset>
                            <label>📍 Neighborhood</label>
                            <div>
                                <input type="radio" class='checkbox' name='checkbox1' onClick={() => setFilterCity()}></input>
                                <label >All Cities</label>
                            </div>
                            {neiborhood_count.map(each => (
                                <div key={each}>
                                    {/* <input type='checkbox' class='checkbox' value={each}></input> */}
                                    <input type="radio" class='checkbox' name='checkbox1' onClick={() => { setFilterCity(each); setFClick(true) }}></input>
                                    <label value={each}>{each}</label>
                                </div>
                            ))}
                        </fieldset>
                    </div>
                    <div className='cuisine-sort'>
                        <fieldset>
                            <label>🧂 Cuisines</label>
                            <div>
                                <input type="radio" class='checkbox' name='checkbox2' onClick={() => setFilterCuisine()}></input>
                                <label >All Cuisines</label>
                            </div>
                            {cuisine_count.map(each => (
                                <div key={each}>
                                    {/* <input type='checkbox' class='checkbox' value={each}></input> */}
                                    <input type="radio" class='checkbox' name='checkbox2' onClick={() => { setFilterCuisine(each); setFClick(true) }}></input>
                                    <label value={each}>{each}</label>
                                </div>
                            ))}
                        </fieldset>
                    </div>

                </div>
                <div className='search-right'>
                    <div className='search-right-sort'>

                        <select onChange={handleSort} >
                            <option value={'default'} disabled selected>{sortLabel}</option>
                            <option value={'newest'} >Newest</option>
                            <option value={'priceasc'} >Ascending Price</option>
                            <option value={'pricedes'} >Decending Price</option>
                            <option value={'default'} >Default</option>
                            {/* <option value={'highrate'}>Highest Rated</option> */}
                        </select>
                    </div>
                    <div className='search-right-res'>
                        <div>
                            Reserving on {searchD} , at {searchT[0]}:{searchT[1]} , for the party of {searchPt}
                        </div>
                        {(searchRes.length === 0) && (
                            <h2>
                                <br></br>
                                - No Results Met Your Search - </h2>
                        )}
                        {noResUnderF && fClicked && (<h3>No restaurants Under the Set Filters(s)</h3>)}
                        {searchRes?.map(restaurant => {
                            return (filterPrice ? (restaurant.price_range === filterPrice) : true) && (filterCuisine ? (restaurant.cuisine === filterCuisine) : true) && (filterCity ? (String(restaurant.city).toLocaleLowerCase() == String(filterCity).toLocaleLowerCase()) : true) && (<div className='search-res-each' key={restaurant.id}>
                                <NavLink className='search-res-nav-whole' to={`/restaurants/${restaurant.id}`}>
                                    <div className='search-res-cover'>
                                        <img src={restaurant.cover} alt='restaurant img' height={'150px'}
                                            onError={(e) => {
                                                if (e.target.src !== defaultImg3) { e.target.onerror = null; e.target.src = defaultImg3; }
                                            }} />
                                    </div>
                                    <div className='search-res-details'>
                                        <div className='search-res-nav-div'>
                                            <NavLink className='search-res-nav' to={`/restaurants/${restaurant.id}`}>{restaurant.name}</NavLink>
                                        </div>
                                        <div className='search-res-dcl'>{dollarSigns[restaurant.price_range]} · {restaurant.cuisine} · {restaurant.city}</div>
                                    </div>
                                        <div className='search-res-timeslots'>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={searchT} >Reserve Now</button>
                                            {/* 
                                            <> or </>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={String(getHours(restaurant) - 3) + ':00'} >Find Another Available Spots</button>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={getHours(restaurant) - 3 +':00'} disabled={niXX <= nowHour}>{getHours(restaurant) - 3}:00</button>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={String(getHours(restaurant) - 3) + ':00'} disabled={e => validateSearchDate(e)}>{getHours(restaurant) - 3}:00</button>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={String(getHours(restaurant) - 3) + ',15'} disabled={e => validateSearchDate(e)}>{getHours(restaurant) - 3}:15</button>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={String(getHours(restaurant) - 3) + ',30'} disabled={e => validateSearchDate(e)}>{getHours(restaurant) - 3}:30</button>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={String(getHours(restaurant) - 3) + ',45'} disabled={e => validateSearchDate(e)}>{getHours(restaurant) - 3}:45</button>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={String(getHours(restaurant) - 2) + ',00'} disabled={e => validateSearchDate(e)}>{getHours(restaurant) - 2}:00</button>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={String(getHours(restaurant) - 2) + ',15'} disabled={e => validateSearchDate(e)}>{getHours(restaurant) - 2}:15</button>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={String(getHours(restaurant) - 2) + ',30'} disabled={e => validateSearchDate(e)}>{getHours(restaurant) - 2}:30</button>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={String(getHours(restaurant) - 2) + ',45'} disabled={e => validateSearchDate(e)}>{getHours(restaurant) - 2}:45</button>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={String(getHours(restaurant) - 1) + ',00'} disabled={e => validateSearchDate(e)}>{getHours(restaurant) - 1}:00</button> */}
                                        </div>
                                </NavLink>
                            </div >)
                        }
                        )
                        }
                    </div>
                </div>
                <div className='search-map'>
                    <GoogleMapAPIMany searchRes={searchRes} />
                </div>
            </div >
            {showHomeReserve && <Modal>
                <SearchReservationModal searchPt={searchPt} resId={resId} resTime={resTime} setShowHomeReserve={setShowHomeReserve} searchD={searchD} searchT={searchT} />
            </Modal>}
        </div >
    )
}
