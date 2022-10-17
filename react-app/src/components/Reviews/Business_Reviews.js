import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getAllReviewsThunk } from '../../store/review';
import loadingpic from '../../icons/Logo.jpg'
import './business_review.css'


function BusinessReviews() {
    const dispatch = useDispatch();
    const { restaurantId } = useParams();
    const reviews = useSelector(state => state.review.allreviews)
    const [loaded, setLoaded] = useState(false)
    const sessionUser = useSelector(state => state.session.user);

    let countValue1 = 0;
    let countValue2 = 0;
    let countValue3 = 0;
    let countValue4 = 0;
    let countValue5 = 0;

    let sumFood = 0;
    let sumService = 0;
    let sumAmbience = 0;
    let sumValue = 0;


    useEffect(() => {
        dispatch(getAllReviewsThunk(restaurantId)).then(() => {
            setLoaded(true);
        })
    }, [dispatch, restaurantId])

    reviews?.map(each => {
        if (each.overall == 1) countValue1++
        if (each.overall == 2) countValue2++
        if (each.overall == 3) countValue3++
        if (each.overall == 4) countValue4++
        if (each.overall == 5) countValue5++
        sumFood += each['food']
        sumService += each['service']
        sumAmbience += each['ambience']
        sumValue += each['overall']

    })

    const percentValue1 = (reviews?.length == 0) ? 0 : (countValue1 / reviews?.length * 100).toFixed(2) + '%'
    const percentValue2 = (reviews?.length == 0) ? 0 : (countValue2 / reviews?.length * 100).toFixed(2) + '%'
    const percentValue3 = (reviews?.length == 0) ? 0 : (countValue3 / reviews?.length * 100).toFixed(2) + '%'
    const percentValue4 = (reviews?.length == 0) ? 0 : (countValue4 / reviews?.length * 100).toFixed(2) + '%'
    const percentValue5 = (reviews?.length == 0) ? 0 : (countValue5 / reviews?.length * 100).toFixed(2) + '%'


    let avgFood = (sumFood / reviews?.length).toFixed(1);
    let avgService = (sumService / reviews?.length).toFixed(1);
    let avgAmbience = (sumAmbience / reviews?.length).toFixed(1);
    let avgValue = (sumValue / reviews?.length).toFixed(1);
    let avgForAll = (sumFood + sumService + sumAmbience + sumValue) / reviews?.length / 4

    const stars = [0, '⭑☆☆☆☆', '⭑⭑☆☆☆', '⭑⭑⭑☆', '⭑⭑⭑⭑☆', '⭑⭑⭑⭑⭑']

    console.log('waht is the avg for all', avgForAll)

    if (!loaded) {
        return <div className='loading-img'>
            <img src={loadingpic}></img>
        </div>
    }

    return loaded && (
        <div className='business-review-container'>
            <a name="reviewSession"></a>

            <div className='b-review-left'>
            </div>

            <div className='b-review-right'>
                {(reviews.length > 0) ? <h3>What {reviews?.length} people are saying...</h3> :
                    <h3>No reviews yet</h3>}
                <div className='score-overview-board'>
                    Overall ratings and reviews
                    <div style={{ color: "silver" }}>Reviews can only be made by diners who have reserved at this restaurant</div>
                    <br></br>
                    <div>{(reviews.length > 0) ? (avgForAll + ' '+' stars based on recent ratings :') : 'No scores available yet.'}</div>
                    <div className='all-cate-avg'>
                        <div className='each-cate-avg'>
                            <div><span class="redword">{(reviews.length > 0) ? avgValue : '-'}</span></div>
                            <div>Value</div>
                        </div>
                        <div className='each-cate-avg'>
                            <div><span class="redword">{(reviews.length > 0) ? avgFood : '-'}</span></div>
                            <div>Food</div>
                        </div>
                        <div className='each-cate-avg'>
                            <div><span class="redword">{(reviews.length > 0) ? avgService : '-'}</span></div>
                            <div>Service</div>
                        </div>
                        <div className='each-cate-avg'>
                            <div><span class="redword">{(reviews.length > 0) ? avgAmbience : '-'}</span></div>
                            <div>Ambience</div>
                        </div>
                    </div>

                    <div className='review-data-bar'>
                        <div>5</div>
                        <div style={{ backgroundColor: "WhiteSmoke" }} className='percent-bar'>
                            <div style={{ backgroundColor: "#E80000", width: percentValue5, color: 'transparent', height: "20px" }}>
                                5
                            </div>
                        </div>
                        <div>4</div>
                        <div style={{ backgroundColor: "WhiteSmoke" }} className='percent-bar'>
                            <div style={{ backgroundColor: "#D80000", width: percentValue4, color: 'transparent', height: "20px" }}>
                                4
                            </div>
                        </div>
                        <div>3</div>
                        <div style={{ backgroundColor: "WhiteSmoke" }} className='percent-bar'>
                            <div style={{ backgroundColor: "#C80000", width: percentValue3, color: 'transparent', height: "20px" }}>
                                3
                            </div>
                        </div>
                        <div>2</div>
                        <div style={{ backgroundColor: "WhiteSmoke" }} className='percent-bar'>
                            <div style={{ backgroundColor: '#B80000', width: percentValue2, color: 'transparent', height: "20px" }}>
                                2
                            </div>
                        </div>
                        <div>1</div>
                        <div style={{ backgroundColor: "WhiteSmoke" }} className='percent-bar'>
                            <div style={{ backgroundColor: "#A80000", width: percentValue1, color: 'transparent', height: "20px" }}>
                                1
                            </div>
                        </div>
                    </div>

                </div>

                {/* <div>
                    Sort by
                    <select>
                        <option>Newest</option>
                        <option>Highest rating</option>
                        <option>Lowest rating</option>
                    </select>
                </div> */}

                {reviews?.length > 0 && reviews?.map(review => {
                    return <div className='b-review-each' key={review.id}>
                        <div className='b-review-left'>
                            <div className='b-review-left-profile'>{review.user.first_name.slice(0, 1)}{review.user.last_name.slice(0, 1)}</div>
                            <div className='b-review-left-name'>{review.user.username}</div>
                        </div>
                        <div className='b-review-right'>
                            <div >
                                <div className='b-review-right-top'>
                                    <div className='b-review-right-top-stars'><span class="redword">{stars[review.overall]}</span></div>
                                <div>&nbsp; · &nbsp;Reviewed on {review.updated_at.slice(5, 11)}, {review.updated_at.slice(12, 16)}</div>
                            </div>
                            <div className='b-review-right-mid'>
                                <div>Overall <span class="redword">{review.overall}</span> · &nbsp;</div>
                                <div>Food <span class="redword">{review.food}</span> · &nbsp;</div>
                                <div>Service <span class="redword">{review.service}</span> · &nbsp;</div>
                                <div>Ambience <span class="redword">{review.ambience}</span></div>
                            </div>
                        </div>
                        <div className='b-review-right-buttom'>{review.review_body}</div>
                        {(review.user.id == sessionUser.id) && <div className='b-review-edit'>
                            <button>edit</button>
                        </div>}
                    </div>
                    </div>
                }
                )}

        </div>
        </div >
    )
}

export default BusinessReviews;
