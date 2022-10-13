import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchRestaurantThunk } from '../../store/search';
import { Modal } from '../context/Modal';
import SearchReservationModal from '../Reservations/Reservation_Create_Modal_at_Search';
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
    const [resHour, setResHour] = useState();
    const [filterPrice, setFilterPrice] = useState();
    const [filterCuisine, setFilterCuisine] = useState();
    const [sortLabel, setSortLabel] = useState('Sort by');
    const searchRes = useSelector(state => state.search)
    const searchResLength = useSelector(state => state.errors)

    const dollarSigns = ['', '$', '$$', '$$$', '$$$$'];

    useEffect(() => {
        dispatch(searchRestaurantThunk(location)).then(() => setLoaded(true))
    }, [dispatch, history])

    let searchD = window.location.search.split('&')[0].split('=')[1].split('T')[0]
    let searchDyear = searchD.split('-')[0]
    let searchDmonth = searchD.split('-')[1]
    let searchDday = searchD.split('-')[2]
    let searchT = window.location.search.split('&')[0].split('=')[1].split('T')[1].split('%3A')
    let searchPt = Number(window.location.search.split('&')[1].split('=')[1])

    console.log('what is tttt', searchT)

    const handleHomeReserve = async (e, id) => {
        e.preventDefault();
        console.log('what is the e value now---> ', e.target.value)
        console.log('what is the e value now---> ', e.target.value.split(",")[0] > nowHour)
        setRestId(id)
        setResTime(e.target.value)
        setShowHomeReserve(true)
    }

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

    console.log('what is now hour', 17 - nowHour)

    const validateSearchDate = async (e) => {
        let daySearch = new Date(searchD)
        let dayNowNew = new Date(nowYear + '-' + todayMonth + '-' + nowDate)
        let slotHour = Number(e.target.value.split(',')[0]);
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
                            <label>Price Range</label>
                            <div>
                                <input type="radio" name='priceradio' id='priceradios' onClick={() => setFilterPrice()}>
                                </input>
                                <label>All Price Range</label>
                            </div>
                            <div>
                                <input type="radio" name='priceradio' id='priceradios' onClick={() => setFilterPrice(1)}></input>
                                <label>$30 and under</label>
                            </div>
                            <div>
                                <input type="radio" name='priceradio' id='priceradios' onClick={() => setFilterPrice(2)} ></input>
                                <label>$31 to $50</label>
                            </div>
                            <div>
                                <input type="radio" name='priceradio' id='priceradios' onClick={() => setFilterPrice(3)}></input>
                                <label>$51 to $100</label>
                            </div>
                            <div>
                                <input type="radio" name='priceradio' id='priceradios' onClick={() => setFilterPrice(4)}></input>
                                <label>$101 and over</label>
                            </div>
                        </fieldset>
                    </div>
                    <div className='cuisine-sort'>
                        <fieldset>
                            <label>Cuisines</label>
                            <div>
                                <input type="radio" class='checkbox' name='checkbox' onClick={() => setFilterCuisine()}></input>
                                <label >All Cuisines</label>
                            </div>
                            {cuisine_count.map(each => (
                                <div key={each}>
                                    {/* <input type='checkbox' class='checkbox' value={each}></input> */}
                                    <input type="radio" class='checkbox' name='checkbox' onClick={() => setFilterCuisine(each)}></input>
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
                            <option value={'priceasc'} >Price Range: Ascending - $</option>
                            <option value={'pricedes'} >Price Range: Decending - $$$$</option>
                            <option value={'default'} >Default</option>
                            {/* <option value={'highrate'}>Highest Rated</option> */}
                        </select>
                    </div>
                    <div className='search-right-res'>
                        <div>
                            Reserving on {searchD} , at {searchT[0]}:{searchT[1]} , for the party of {searchPt}
                        </div>
                        {searchRes?.map(restaurant => {
                            return (filterPrice ? (restaurant.price_range === filterPrice) : true) && (filterCuisine ? (restaurant.cuisine === filterCuisine) : true) && (<div className='search-res-each' key={restaurant.id}>
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
                                        <div className='search-res-timeslots'>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={searchT} >exactly at {searchT[0]}:{searchT[1]}</button>
                                            <> or </>
                                            {/* <button onClick={e => handleHomeReserve(e, restaurant.id)} value={getHours(restaurant) - 3 +':00'} disabled={niXX <= nowHour}>{getHours(restaurant) - 3}:00</button> */}
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={String(getHours(restaurant) - 3) + ':00'} disabled={false}>{getHours(restaurant) - 3}:00</button>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={String(getHours(restaurant) - 3) + ':00'} disabled={e => validateSearchDate(e)}>{getHours(restaurant) - 3}:00</button>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={String(getHours(restaurant) - 3) + ',15'} disabled={e => validateSearchDate(e)}>{getHours(restaurant) - 3}:15</button>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={String(getHours(restaurant) - 3) + ',30'} disabled={e => validateSearchDate(e)}>{getHours(restaurant) - 3}:30</button>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={String(getHours(restaurant) - 3) + ',45'} disabled={e => validateSearchDate(e)}>{getHours(restaurant) - 3}:45</button>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={String(getHours(restaurant) - 2) + ',00'} disabled={e => validateSearchDate(e)}>{getHours(restaurant) - 2}:00</button>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={String(getHours(restaurant) - 2) + ',15'} disabled={e => validateSearchDate(e)}>{getHours(restaurant) - 2}:15</button>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={String(getHours(restaurant) - 2) + ',30'} disabled={e => validateSearchDate(e)}>{getHours(restaurant) - 2}:30</button>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={String(getHours(restaurant) - 2) + ',45'} disabled={e => validateSearchDate(e)}>{getHours(restaurant) - 2}:45</button>
                                            <button onClick={e => handleHomeReserve(e, restaurant.id)} value={String(getHours(restaurant) - 1) + ',00'} disabled={e => validateSearchDate(e)}>{getHours(restaurant) - 1}:00</button>
                                        </div>
                                    </div>
                                </NavLink>

                                {/* {restaurant => slotGenerator(restaurant).map(each => {
                            <div>{each}</div>
                        })} */}
                            </div >)
                        }
                        )
                        }
                    </div>
                </div>
            </div >
            {showHomeReserve && <Modal>
                <SearchReservationModal searchPt={searchPt} resId={resId} resTime={resTime} setShowHomeReserve={setShowHomeReserve} searchD={searchD} searchT={searchT} />
            </Modal>}
        </div >
    )
}
