import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getAllReviewsThunk } from '../../store/review';


function BusinessReviews() {
    const dispatch = useDispatch();
    const { restaurantId } = useParams();
    const reviews = useSelector(state => state.review.allreviews)
    const [loaded, setLoaded] = useState(false)
    const sessionUser = useSelector(state => state.session.user);


    useEffect(() => {
        dispatch(getAllReviewsThunk(restaurantId)).then(() => {
            setLoaded(true);
        })
    }, [dispatch, restaurantId])

    console.log('what is the reviews', reviews)

    const avgCalculator = x => {
        if (loaded && reviews) {
            let sum = reviews.reduce((pre, curr) =>
                pre[x] + curr[x], 0
            )
            let avg = sum / reviews.length
            return avg
        }
    }

    let avgFood = avgCalculator('food');
    let avgService = avgCalculator('service');
    let avgAmbience = avgCalculator('ambience');
    let avgValue = avgCalculator('value');

    return loaded && (
        <div className='business-review-container'>
            <a name="reviewSession"></a>

            <div className='b-review-left'>
            </div>

            <div className='b-review-right'>
                {(reviews.length > 0) ? <h3>What {reviews?.length} people are saying</h3> :
                    <h3>No reviews yet</h3>}
                <div>
                    Overall ratings and reviews
                    <div>Reviews can only be made by diners who have reserved at this restaurant</div>
                    <div>{avgFood ? (avgFood + avgService + avgAmbience + avgValue) / 4 + ' stars based on recent ratings' : 'No scores available'}</div>
                    <div>
                        <div>{avgFood ? avgFood : '-'}</div>
                        <div>Food</div>
                    </div>
                    <div>
                        <div>{avgService ? avgService : '-'}</div>
                        <div>Service</div>
                    </div>
                    <div>
                        <div>{avgAmbience ? avgAmbience : '-'}</div>
                        <div>Ambience</div>
                    </div>
                    <div>
                        <div>{avgValue ? avgValue : '-'}</div>
                        <div>Value</div>
                    </div>
                </div>
                <div>
                    <div>5</div>
                    <div>4</div>
                    <div>3</div>
                    <div>2</div>
                    <div>1</div>
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
                            <div>{review.user.first_name.slice(0, 1)}{review.user.last_name.slice(0, 1)}</div>
                            <div>{review.user.username}</div>
                        </div>
                        <div className='b-review-right'>
                            <div className='b-review-left-top'>
                                <div>stars~~~~~</div>
                                <div>Reviewed on {review.updated_at.slice(5, 11)}, {review.updated_at.slice(12, 16)}</div>
                                <div>Overall {review.overall} · </div>
                                <div>Food {review.food} · </div>
                                <div>Service{review.service} · </div>
                                <div>Ambience{review.ambience}</div>
                            </div>
                            <div className='b-review-bottom'>{review.review_body}</div>
                            {(review.user.id == sessionUser.id) && <div className='b-review-edit'>
                                <button>edit</button>
                            </div>}
                        </div>
                    </div>
                }
                )}

            </div>
        </div>
    )
}

export default BusinessReviews;
